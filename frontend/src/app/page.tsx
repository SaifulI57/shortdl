"use client";

import React from "react";
import Footer from "@/components/footer";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

type Message = {
  filename: string;
  title: string;
  description: string;
  tag: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [file, setFilename] = useState("Filename");
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [tag, setTag] = useState("Tag");
  const [srcimg, setimg] = useState("/1.png")
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, msg];
        if (newMessages.length === 1) {
          const firstMessage = newMessages[0];
          setFilename(firstMessage.filename);
          setTitle(firstMessage.title);
          setDescription(firstMessage.description);
          setTag(firstMessage.tag);
        }
        return newMessages;
      });
    };

    return () => {
      socket.close();
    };
  }, []);
  const upload = () => {
    setMessages(messages.filter((m, i) => i != selectedIndex));
  };
  const handleCardClick = (index: number) => {
    console.log(index);
    const message = messages[index];
    setFilename(message.filename);
    setTitle(message.title);
    setDescription(message.description);
    setTag(message.tag);
    setSelectedIndex(index);
  };
  const handleTitleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };
  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };
  const handleTagInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const regex = /\s(\w+)/;
    const match = e.target.value.match(regex);
    let new_val;

    if (e.target.value.startsWith("#")) {
      if (
        match &&
        e.target.value[e.target.value.indexOf(match[0]) + match[0].length] ===
          "#"
      ) {
        new_val = e.target.value;
      } else {
        new_val = e.target.value.replace(/\s(?!#)/g, " #");
      }
    } else {
      if (
        match &&
        e.target.value[e.target.value.indexOf(match[0]) + match[0].length] ===
          "#"
      ) {
        new_val = e.target.value;
      } else {
        new_val = `#${e.target.value.replace(/\s(?!#)/g, " #")}`;
      }
    }

    setTag(new_val);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <NextUIProvider>
      <main className="w-screen xs:flex xs:justify-center xs:items-center font-syne md:h-screen xs:h-auto bg-gray-200 text-black">
        <div className="container w-full h-full flex items-center md:flex-row">
          <div className="side-panel xs:w-[21%] xs:h-auto flex md:flex-col md:p-8 md:w-[20%] md:h-full xs:absolute xs:bottom-0 xs:inset-x-[40%] xs:items-end xs:justify-center md:justify-start md:items-start xs:z-10 md:relative md:inset-x-0">
            <div className="md:hidden bottom-0 flex w-auto fixed items-end inset-y-2">
              <Button onPress={onOpen}>
                <svg
                  version="1.1"
                  className="-rotate-90 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 256 256"
                  enableBackground="new 0 0 256 256"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <path
                        fill="#000000"
                        d="M192.4,128L74.4,10L63.7,20.7L170.9,128L63.6,235.3L74.3,246L192.4,128z"
                      />
                    </g>
                  </g>
                </svg>
              </Button>

              <Modal
                isOpen={isOpen}
                placement="bottom-center"
                className="text-black"
                onOpenChange={onOpenChange}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Videos
                      </ModalHeader>
                      <ModalBody>
                        {messages.map((msg, index) => (
                          <div
                            key={index}
                            onClick={() => handleCardClick(index)}
                            className="border text-gray-900 border-gray-300 p-4 cursor-pointer rounded-md shadow-sm bg-white hover:bg-gray-100 transition focus:bg-slate-500"
                          >
                            <p className="truncate">
                              <strong>{msg.filename}</strong>
                            </p>
                          </div>
                        ))}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
            <h1 className="md:text-2xl xs:opacity-0 md:opacity-100 font-semibold relative ">Videos</h1>
            {messages.map((msg, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className={`border text-gray-900 md:block xs:hidden border-gray-300 my-2 p-3 cursor-pointer rounded-md shadow-sm  hover:bg-gray-300 transition ${selectedIndex === index ? "bg-slate-400": "bg-white"}`}
              >
                <p className="truncate">
                  <strong>{msg.filename}</strong>
                </p>
              </div>
            ))}
          </div>
          <div className="main-panel flex items-center justify-center border-2 w-full h-full">
            <div className="wrap md:w-[95%] xs:w-full rounded-md bg-white h-[95%]">
              <div className="flex h-full w-full items-center justify-center flex-col">
                <div className="preview rounded-md bg-regal-gray xs:h-[25vh] my-12 md:h-[40%] w-[95%]">
                  <div className="filename md:-inset-y-8 xs:-inset-y-8 relative">
                    <h1 className="text-xl font-semibold">{file}</h1>
                  </div>
                  <div className="overlay relative rounded-md bg-regal-lime xs:w-[25%] xs:h-[20%] xs:-inset-x-2 xs:-inset-y-4 md:-inset-x-6 md:w-[8%] md:h-[20%]">
                    <div className="content-overlay flex items-center justify-center h-full w-full relative bg-regal-green inset-x-1 rounded-md font-bold -inset-y-1">
                      <h3>Preview</h3>
                    </div>
                  </div>
                  <div className="preview-text w-[60%] relative xs:inset-x-2 md:inset-x-12 p-6 py-2">
                    <h2>{title}</h2>
                    <p className="truncate w-full">{description} {tag}</p>
                  </div>
                  <div className="absolute md:opacity-100 xs:opacity-0 flex items-center justify-center bg-regal-brown rounded-xl md:w-[15%] md:inset-x-[72%] md:inset-y-[12%] w-auto h-auto md:h-[45%]">
                    <div
                      className="content-text-prev relative -inset-x-2 inset-y-2 bg-cover rounded-xl w-full h-full"
                      style={{
                        backgroundImage: `url(${srcimg})`,
                      }}
                    >
                      <div className="img  flex items-center justify-center rounded-t-xl h-[80%] w-full"></div>
                      <div className="txt text-white font-md relative flex bg-opacity-30 bg-black rounded-md flex-col p-2 px-4">
                        <p className="w-full h-full">
                          <span className="rounded-full w-4 h-4"></span>
                          {title}
                        </p>
                        <p className="truncate">
                          {description} {tag}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:hidden xs:relative flex items-center justify-center bg-regal-brown rounded-xl w-[70%]  h-[50vh]">
                    <div
                      className="content-text-prev relative -inset-x-2 inset-y-2 bg-cover rounded-xl w-full h-full"
                      style={{
                        backgroundImage: `url(${srcimg})`,
                      }}
                    >
                      <div className="img  flex items-center justify-center rounded-t-xl h-[80%] w-full" ></div>
                      <div className="txt text-white font-md relative flex bg-opacity-30 bg-black rounded-md flex-col p-2 px-4">
                        <p className="w-full h-full">
                          <span className="rounded-full w-4 h-4"></span>
                          {title}
                        </p>
                        <p className="truncate">
                          {description} {tag}
                        </p>
                      </div>
                    </div>
                  </div>
                <div className="main-board rounded-md bg-white flex xs:flex-col xs:items-center xs:justify-center md:flex-row h-[80%] w-full">
                  <div className="main-section relative overflow-hidden xs:w-full md:w-[60%] h-full p-8">
                    <textarea
                      name="title"
                      onChange={handleTitleInputChange}
                      className="w-full h-12 font-bold text-4xl resize-none focus:outline-none xs:p-0 xs:pl-0 md:p-1 md:pl-3 no-scrollbar"
                      id="title"
                      value={title}
                      rows={10}
                    ></textarea>
                    <textarea
                      name="tag"
                      onChange={handleTagInputChange}
                      className="w-full h-8 font-bold text-xs resize-none focus:outline-none xs:p-0 md:p-1 xs:pl-0 md:pl-3 no-scrollbar"
                      id="tag"
                      value={tag}
                      rows={10}
                    ></textarea>
                    <textarea
                      name="description"
                      onChange={handleDescriptionInputChange}
                      className="w-full h-full resize-none focus:outline-none md:p-4 xs:p-0 no-scrollbar"
                      id="desc"
                      value={description}
                      rows={10}
                    ></textarea>
                    <button className="absolute font-semibold rounded-md border-r-4 border-b-4 md:w-[12%] bg-regal-blue  border-black md:h-[10%] xs:h-[10%] xs:w-[50%] xs:inset-x-[40%] xs:inset-y-[80%] md:inset-x-[80%] md:inset-y-[80%] z-9 hover:bg-slate-300 active:bg-gray active:border-r-0 active:border-b-0 hover:ease-in-out hover:duration-200 hover:bg-gray">
                      Upload
                    </button>
                  </div>

                  <div className="additional-section relative md:h-full xs:h-[40vh] flex flex-col xs:w-[90%] md:w-[40%]">
                    <div className="overlay-border absolute md:opacity-30 xs:opacity-0 inset-x-0 inset-y-[10%]  h-[80%] w-0.5 rounded-full opacity-25 bg-black"></div>
                    <div className="overlay-border absolute md:opacity-30 xs:opacity-0 inset-x-0.5 inset-y-[40%] h-0.5 w-[90%] rounded-r-full opacity-25 bg-black"></div>
                    <div className="overlay-none w-full xs:h-0 md:h-[40%]"></div>
                    <div className="content border-black h-[50%]  p-4">
                      <h3 className="text-md font-bold">
                        Additional Information:
                      </h3>
                      <p>Link</p>
                      <p>Src Platform</p>
                      <p>Dst Platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </NextUIProvider>
  );
}
