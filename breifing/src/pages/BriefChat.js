import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BotMessage from "../components/BotMessage";
import axios from "axios";

const BriefChat = () => {
  const { register, reset, handleSubmit } = useForm();
  const [chats, setChats] = useState([]);
  const onValid = ({ chat }) => {
    console.log(chat);
    reset();
  };

  const onClickNewChatBtn = () => {
    setChats([]);
  };
  useEffect(() => {}, []);
  return (
    <div className="h-screen flex flex-col">
      <div className="pl-7 pr-5 flex justify-between items-end bg-primaryBgColor pt-[9px] pb-[22px]">
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
              stroke-width="3"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
          <span className="text-sm">새 채팅</span>
        </div>
      </div>
      <div className="flex-1 bg-secondBgColor">
        <div>
          <BotMessage
            content={
              "Brief는 어제의 이슈에 대해서 뉴스 등의 기사를 통해 정보를 제공합니다.\n\n해당 내용은 100% 신뢰할 수 없는 내용일 수 있으며, 높은 신뢰도를 위해서는 추천 기사 등을 통해 정보를 확인하시기 바랍니다.\n\n어떤 것이 궁금하신가요?"
            }
            time={"2023/08/21T13:00:00"}
          />
        </div>
        <div className="w-screen py-[15px] bg-white px-[15px] fixed bottom-0">
          <form onSubmit={handleSubmit(onValid)} className="w-full relative">
            <input
              {...register("chat")}
              className="input rounded-full w-full bg-[#F0F0F0] placeholder:text-[17px] placeholder:font-[#B6B6B6]"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 1L14 21L10 12L1 8L21 1Z"
                  stroke="#134D80"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
