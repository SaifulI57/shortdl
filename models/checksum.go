package models

import "gorm.io/gorm"

type ChecksumData struct {
	gorm.Model
	ID            uint   `gorm:"primaryKey"`
	ChecksumValue string `gorm:"column:checksum_value;unique"`
	ChecksumUrl   string `gorm:"column:checksum_url;unique"`
	Downloaded    bool   `gorm:"column:downloaded;unique"`
	Uploaded      bool   `gorm:"column:uploaded;unique"`
}
