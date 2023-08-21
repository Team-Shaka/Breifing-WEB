import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import axios from "axios";

const BriefChat = () => {
  const { register, reset, handleSubmit } = useForm();
  const [chatsWithTime, setChatsWithTime] = useState([]);
  const [chatId, setChatId] = useState();
  const [moreTen, setMoreTen] = useState();

  const messageEndRef = useRef(null);

  function getCurrentFormattedDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}/${month}/${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const onClickDelete = () => {
    setMoreTen(false);
  };
  const onValid = (data) => {
    if (data.chat === "") return;
    if (chatsWithTime.length > 10) {
      setMoreTen(true);
      setTimeout(function () {
        setMoreTen(false);
      }, 2000);
      return;
    }
    const prevChatsWhitoutTime = chatsWithTime.map((chat) => {
      const { time, ...others } = chat;
      return others;
    });

    const newChatsWithoutTime = [
      ...prevChatsWhitoutTime,
      {
        role: "User",
        content: data.chat,
      },
    ];

    const newChatsWithTimeNoResponse = [
      ...chatsWithTime,
      {
        role: "User",
        content: data.chat,
        time: getCurrentFormattedDate(),
      },
    ];

    setChatsWithTime(newChatsWithTimeNoResponse);

    axios
      .post(
        `https://7ab7c6c1-9228-4cb2-b19c-774d9cd8b73d.mock.pstmn.io/chattings/234`,
        {
          model: "gpt-3.5-turbo",
          message: newChatsWithoutTime,
        }
      )
      .then((res) => {
        console.log(res);
        const newChatsWithTime = [
          ...newChatsWithTimeNoResponse,
          {
            role: res.data.role,
            content: res.data.content,
            time: res.data.created_at,
          },
        ];
        setChatsWithTime(newChatsWithTime);
      })
      .catch((err) => console.log(err));

    reset();
  };

  const onClickNewChatBtn = () => {
    setChatsWithTime([]);
  };
  useEffect(() => {
    axios
      .post(
        `https://7ab7c6c1-9228-4cb2-b19c-774d9cd8b73d.mock.pstmn.io/chattings`
      )
      .then((res) => {
        console.log(res);
        const firstChat = {
          role: "Bot",
          content:
            "Brief는 어제의 이슈에 대해서 뉴스 등의 기사를 통해 정보를 제공합니다.\n\n해당 내용은 100% 신뢰할 수 없는 내용일 수 있으며, 높은 신뢰도를 위해서는 추천 기사 등을 통해 정보를 확인하시기 바랍니다.\n\n어떤 것이 궁금하신가요?",
          time: res.data.created_at,
        };
        setChatsWithTime([...chatsWithTime, firstChat]);
        setChatId(res.data.chatId);
        const ids = localStorage.getItem("chatId");

        console.log(ids);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatsWithTime]);
  return (
    <div className="h-screen flex flex-col">
      <div className="pl-7 pr-5 flex justify-between items-end bg-primaryBgColor pt-[9px] pb-[22px] w-screen fixed top-0">
        <div className="flex flex-col font-bold text-white">
          <span className="text-[20px]">2023년 8월 7일</span>
          <span className="text-[25px]">직접 물어보기</span>
        </div>
        <div className="btn btn-xs flex items-center text-primaryTextColor bg-white space-x-0 rounded-[30px] gap-0">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span className="text-sm">새 채팅</span>
        </div>
      </div>
      <div className="flex-1 bg-secondBgColor mt-[100px]">
        <div className="mb-20">
          {chatsWithTime.map((chat, i) =>
            chat.role === "Bot" ? (
              <BotMessage key={i} content={chat.content} time={chat.time} />
            ) : (
              <UserMessage key={i} content={chat.content} time={chat.time} />
            )
          )}
          <div
            className={
              moreTen === undefined
                ? "hidden"
                : moreTen
                ? "alert alert-error animate-[bottom-sheet-up_500ms_ease-in-out] shadow-xl flex flex-row fixed bottom-20 gap-0 space-x-2 text-white "
                : "alert alert-error animate-[bottom-sheet-down_500ms_ease-in-out] shadow-xl flex flex-row fixed bottom-0 gap-0 space-x-2 text-white "
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>토큰 만료! 새 채팅을 생성해주세요</span>
          </div>
          <div ref={messageEndRef}></div>
        </div>

        <div className="w-screen py-[15px] bgWhite px-[15px] fixed bottom-0 bg-white">
          <form onSubmit={handleSubmit(onValid)} className="w-full relative">
            <input
              {...register("chat")}
              className="input rounded-full w-full pr-12 bg-[#F0F0F0] placeholder:text-[17px] placeholder:font-[#B6B6B6]"
              placeholder="메시지를 입력하세요."
            />
            <button className="absolute right-5 top-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M21 1L10 12"
                  stroke="#134D80"
                  strokeWidth="2"
                  strokewinecap="round"
                  strokewinejoin="round"
                />
                <path
                  d="M21 1L14 21L10 12L1 8L21 1Z"
                  stroke="#134D80"
                  strokeWidth="2"
                  strokewinecap="round"
                  strokewinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BriefChat;
