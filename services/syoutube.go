package syoutube

import (
	"errors"
	"io"
	"os"
	"regexp"
	"strings"
	"sync"

	"github.com/kkdai/youtube/v2"
	"github.com/relumini/shortdl/database"
	handler_error "github.com/relumini/shortdl/handler"
	"github.com/relumini/shortdl/models"
	"github.com/relumini/shortdl/utils"
)

type Metadata struct {
	Description  string
	Caption      youtube.CaptionTrack
	Title        string
	Transcript   string
	ChecksumUrl  string
	ChecksumDesc string
}

func GetYoutubeShort(idv string) (Metadata, error) {
	client := youtube.Client{}
	var metadata Metadata
	var msgerr string
	var wg sync.WaitGroup

	videoChan := make(chan *youtube.Video)
	errChan := make(chan error)
	transcriptChan := make(chan string)
	wg.Add(2)
	// Get video metadata
	go func() {
		defer close(videoChan)
		defer close(errChan)
		vid, err := client.GetVideo(idv)
		if err != nil {

			errChan <- errors.New("cannot get video")
			return
		}
		videoChan <- vid
	}()
	vid, err := <-videoChan, <-errChan
	if err != nil {
		return Metadata{}, err
	}
	format := vid.Formats.WithAudioChannels()
	sfile := "download/" + utils.ComputeChecksum(strings.ReplaceAll(vid.Title, " ", "_")) + ".mp4"

	if vid.CaptionTracks == nil {
		return Metadata{}, errors.New(string(handler_error.ErrSensitiveContent))
	}
	// Get Transcript
	go func() {
		defer wg.Done()
		transcript, err := client.GetTranscript(vid, vid.CaptionTracks[0].LanguageCode)
		if err != nil {
			errChan <- errors.New("cannot get transcript")
			return
		}
		transcript_fil := regexp.MustCompile(`\d{1,2}:\d{2}\s*-\s*`).ReplaceAllString(transcript.String(), "")
		transcriptChan <- transcript_fil
	}()
	transcript, err := <-transcriptChan, <-errChan
	metadata.Transcript = transcript
	if err != nil {
		return Metadata{}, errors.New(msgerr)
	}
	checkSumUrl := utils.ComputeChecksum(metadata.Caption.BaseURL)
	checkSumDesc := utils.ComputeChecksum(metadata.Description)
	// var existingChecksum models.ChecksumData
	result, err := utils.GetMetadata(database.DB, checkSumUrl)
	// fmt.Print(&result.RowsAffected)

	if err == nil {
		// Jika checksum ditemukan, kembalikan pesan bahwa video sudah diunduh
		msg := "already downloaded the video"
		return Metadata{ChecksumUrl: result.ChecksumUrl}, errors.New(msg)
	} else {
		newChecksum := models.ChecksumData{ChecksumUrl: checkSumUrl, ChecksumValue: checkSumDesc, Uploaded: false, Downloaded: true}
		if err := database.DB.Create(&newChecksum).Error; err != nil {
			msg := "duplicated video"

			return Metadata{}, errors.New(msg)
		}
		// Jika checksum tidak ditemukan, lanjutkan untuk menambahkan checksum baru
	}

	// newChecksum := models.ChecksumData{ChecksumValue: checkSum}
	// if err := database.DB.Create(&newChecksum).Error; err != nil {
	// 	msg := "duplicated video"

	// 	return Metadata{}, errors.New(msg)
	// }

	go func() {
		defer wg.Done()
		stream, _, err := client.GetStream(vid, &format[0])
		if err != nil {
			msgerr += "cannot get stream\n"
			return
		}
		defer stream.Close()

		file, err := os.Create(sfile)
		if err != nil {
			msgerr += "cannot create file\n" + err.Error()
			return
		}
		defer file.Close()

		_, err = io.Copy(file, stream)
		if err != nil {
			msgerr += "cannot copy file\n"
			return
		}
	}()

	// Set metadata fields
	metadata.Description = vid.Description
	metadata.Caption = vid.CaptionTracks[0]
	metadata.Title = vid.Title
	metadata.ChecksumUrl = checkSumUrl
	metadata.ChecksumDesc = checkSumDesc
	// Wait for all goroutines to finish
	wg.Wait()

	if msgerr != "" {
		return Metadata{}, errors.New(msgerr)
	}

	return metadata, nil
}
