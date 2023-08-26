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
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef(null);
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(now.getDate()).padStart(2, "0");

  const nowDate = `${year}-${month}-${day}`;

  function getCurrentFormattedDate() {
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
    setLoading(true);

    const prevChatsWhitoutTime = chatsWithTime.map((chat) => {
      const { time, ...others } = chat;
      return others;
    });

    const newChatsWithoutTime = [
      ...prevChatsWhitoutTime,
      {
        role: "user",
        content: data.chat,
      },
    ];

    const newChatsWithTimeNoResponse = [
      ...chatsWithTime,
      {
        role: "user",
        content: data.chat,
        time: getCurrentFormattedDate(),
      },
      {
        role: "assistant",
        content: loading,
        time: "null",
      },
    ];

    setChatsWithTime(newChatsWithTimeNoResponse);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/chattings/${chatId}`, {
        model: "gpt-3.5-turbo",
        messages: newChatsWithoutTime,
      })
      .then((res) => {
        console.log(res);

        setChatsWithTime((prevChats) => {
          const updatedLastChat = {
            ...prevChats[prevChats.length - 1], // 이전 마지막 요소 복사
            content: res.data.content, // content 변경
            time: res.data.time, // time 변경
          };

          return [
            ...prevChats.slice(0, prevChats.length - 1), // 이전 요소들 복사
            updatedLastChat, // 업데이트된 요소 추가
          ];
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));

    reset();
  };

  const onClickNewChatBtn = () => {
    localStorage.setItem("onClickNew", true);
    window.location.reload();
  };
  useEffect(() => {
    const localChatids = localStorage.getItem("chatIds");
    const prevDate = localStorage.getItem("date");
    const prevClickNew = localStorage.getItem("onClickNew");
    if (
      localChatids === undefined ||
      localChatids === null ||
      prevDate !== nowDate ||
      prevClickNew
    ) {
      // 처음실행시
      // 새 채팅 눌렀을 시
      // 날짜가 바뀌었을 때
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/chattings`)
        .then((res) => {
          console.log(res);
          const firstChat = {
            role: "assistant",
            content:
              "Brief는 어제의 이슈에 대해서 뉴스 등의 기사를 통해 정보를 제공합니다.\n\n해당 내용은 100% 신뢰할 수 없는 내용일 수 있으며, 높은 신뢰도를 위해서는 추천 기사 등을 통해 정보를 확인하시기 바랍니다.\n\n어떤 것이 궁금하신가요?",
            time: res.data.created_at,
          };
          setChatsWithTime([...chatsWithTime, firstChat]);
          setChatId(res.data.id);
          if (localChatids !== undefined) {
            const newLocalIds = `${localChatids},${res.data.id}`;
            localStorage.setItem("chatIds", newLocalIds);
          } else {
            localStorage.setItem("chatIds", res.data.id);
            localStorage.setItem("date", nowDate);
            localStorage.setItem("onClickNew", false);
          }
        })
        .catch((err) => console.log(err));
    } else if (localChatids !== undefined) {
      //나갔다가 들어왔을 떄
      const id = localChatids.split(",")[-1];
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/chattings/${id}` //여기서 id넘겨야함
        )
        .then((res) => {
          console.log(res);
          setChatsWithTime(res.data.messages);
          localStorage.setItem("date", nowDate);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatsWithTime]);
  return (
    <div className="h-screen flex flex-col">
      <div className="pl-7 pr-5 flex justify-between items-end bg-primaryBgColor pt-[9px] pb-[22px] w-screen fixed top-0">
        <div className="flex flex-col font-bold text-white">
          <span className="text-[20px]">
            {year}년 {month}월 {day}일
          </span>
          <span className="text-[25px]">직접 물어보기</span>
        </div>
        <div
          className="btn btn-xs flex items-center text-primaryTextColor bg-white space-x-0 rounded-[30px] gap-0"
          onClick={onClickNewChatBtn}
        >
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
            chat.role === "assistant" ? (
              loading &&
              chatsWithTime.length !== 1 &&
              i === chatsWithTime.length - 1 ? (
                <BotMessage key={i} loading={loading} time={chat.time} />
              ) : (
                <BotMessage key={i} content={chat.content} time={chat.time} />
              )
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
