import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import axios from "axios";

export function cls(...classnames) {
  return classnames.join(" ");
}

const BriefChat = () => {
  const { register, reset, handleSubmit } = useForm();

  const [chatId, setChatId] = useState();
  const [moreThree, setMoreThree] = useState();
  const [tokens, setTokens] = useState(3);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const localChatids = localStorage.getItem("chatIds");
  const prevDate = localStorage.getItem("date");
  const prevClickNew = localStorage.getItem("onClickNew");

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
  const [chatsWithTime, setChatsWithTime] = useState([
    {
      role: "assistant",
      content:
        "Brief는 어제의 이슈에 대해서 뉴스 등의 기사를 통해 정보를 제공합니다.\n\n해당 내용은 100% 신뢰할 수 없는 내용일 수 있으며, 높은 신뢰도를 위해서는 추천 기사 등을 통해 정보를 확인하시기 바랍니다.\n\n어떤 것이 궁금하신가요?",
      time: getCurrentFormattedDate(),
    },
  ]);
  const onClickDelete = () => {
    setMoreThree(false);
  };

  const onValid = async (data) => {
    if (data.chat === "") return;
    if (chatsWithTime.length > 6) {
      setMoreThree(true);
      setTimeout(function () {
        setMoreThree(false);
      }, 2000);
      return;
    }

    setLoading(true);

    try {
      let newChatId = chatId;

      if (!isValid) {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/chattings`
        );
        console.log(response);

        newChatId = response.data.id;
        setChatId(newChatId);

        if (localChatids !== undefined && localChatids !== null) {
          const newLocalIds = `${localChatids},${response.data.id}`;
          localStorage.setItem("chatIds", newLocalIds);
        } else {
          localStorage.setItem("chatIds", response.data.id);
          localStorage.setItem("date", nowDate);
          localStorage.setItem("onClickNew", false);
        }

        setIsValid(true);
      }

      const prevChatsWithoutTime = chatsWithTime.map((chat) => {
        const { time, ...others } = chat;
        return others;
      });

      const newChatsWithoutTime = [
        ...prevChatsWithoutTime,
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

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/chattings/${newChatId}`,
          {
            model: "gpt-3.5-turbo",
            messages: newChatsWithoutTime,
          }
        );
        console.log(response);
        setTokens((prev) => prev - 1);
        setChatsWithTime((prevChats) => {
          const updatedLastChat = {
            ...prevChats[prevChats.length - 1], // 이전 마지막 요소 복사
            content: response.data.content, // content 변경
            time: response.data.created_at, // time 변경
          };

          return [
            ...prevChats.slice(0, prevChats.length - 1), // 이전 요소들 복사
            updatedLastChat, // 업데이트된 요소 추가
          ];
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      reset();
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  const onClickNewChatBtn = () => {
    localStorage.setItem("onClickNew", true);
    window.location.reload();
  };

  useEffect(() => {
    if (localChatids !== undefined && prevDate === nowDate) {
      //나갔다가 들어왔을 떄
      const id = localChatids.split(",")[-1];
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/chattings/${id}`)
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
  console.log(chatsWithTime);
  return (
    <div className="h-screen flex flex-col">
      <div className="pl-7 pr-5 flex justify-between items-end bg-secondBgColor pt-16 pb-7 w-screen fixed top-0">
        <div className="flex items-center justify-between w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="24"
            viewBox="0 0 14 24"
            fill="none"
          >
            <path
              d="M12 2L2 12L12 22"
              stroke="#134D80"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-primaryTextColor textLg font-normal">
            #{"배터리 혁명"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="21"
            viewBox="0 0 25 21"
            fill="none"
          >
            <path
              d="M24 10.2H17.1L14.8 13.65H10.2L7.9 10.2H1"
              stroke="#134D80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.9675 2.2765L1 10.2V17.1C1 17.71 1.24232 18.295 1.67365 18.7263C2.10499 19.1577 2.69 19.4 3.3 19.4H21.7C22.31 19.4 22.895 19.1577 23.3263 18.7263C23.7577 18.295 24 17.71 24 17.1V10.2L20.0325 2.2765C19.8421 1.89331 19.5486 1.57083 19.1849 1.34532C18.8212 1.11982 18.4019 1.00023 17.974 1H7.026C6.5981 1.00023 6.17875 1.11982 5.8151 1.34532C5.45145 1.57083 5.15791 1.89331 4.9675 2.2765Z"
              stroke="#134D80"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex-1 bg-secondBgColor mt-32 text-base">
        <div className="mb-28">
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
              cls(
                "alert  flex flex-col shadow-md fixed space-y-1 bg-white",
                moreThree === undefined
                  ? "hidden"
                  : moreThree
                  ? " animate-[bottom-sheet-up_500ms_ease-in-out] bottom-40"
                  : " animate-[bottom-sheet-down_500ms_ease-in-out] -bottom-20 "
              )
              /*  ismoreThree === undefined
                ? "hidden"
                :  */
            }
          >
            <div className="text-[20px] font-bold">토큰 만료</div>
            <div className="text-base">
              토큰이 만료되어 추가 질문이 불가합니다. 추가 내용은
              설정&#62;유의사항을 확인해주세요.
            </div>
            <div
              onClick={() => setMoreThree(false)}
              className="btn bg-[#C6C6C6] font-bold text-base p-2 roundedLg w-full"
            >
              확인
            </div>
          </div>
          <div ref={messageEndRef}></div>
        </div>

        <div className="w-screen pb-[15px] bg-secondBgColor  fixed bottom-0 ">
          <div className="w-screen bg-white py-1 text-primaryTextColor text-sm flex justify-center my-4">
            남은 메시지 토큰: {tokens}
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className="w-full relative px-[15px]"
          >
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
