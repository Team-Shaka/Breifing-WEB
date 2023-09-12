import React from "react";
import { ReactComponent as Logo } from "../../src/assets/images/logo.svg";
import "./loading.css";

// params 예시

// const content = `Brief는 어제의 이슈에 대해서 뉴스 등의 기사를 통해 정보를 제공합니다.
// 해당 내용은 100% 신뢰할 수 없는 내용일 수 있으며, 높은 신뢰도를 위해서는 추천 기사 등을 통해 정보를 확인하시기 바랍니다.
// 어떤 것이 궁금하신가요?`;

// const time = "2023/08/21T13:00:00";

function BotMessage({ content, time, loading }) {
  function formatTime(timeString) {
    if (typeof timeString !== "string") return "";
    const [datePart, timePart] = timeString.split("T");
    const [year, month, day] = datePart.split("/");
    const [hours, minutes] = timePart.split(":");

    const parsedHours = parseInt(hours);
    const period = parsedHours >= 12 ? "오후" : "오전";
    const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
    const formattedMinutes = parseInt(minutes) === 0 ? "0" : parseInt(minutes);
    console.log(period, formattedHours, formattedMinutes);
    return `${period} ${formattedHours}시 ${formattedMinutes}분`;
  }

  const formattedTime = formatTime(time);

  return (
    <div className="flex py-2">
      <div className="chat-profile-wrap px-3">
        <div className=" w-9 h-9 rounded-full border-2 border-primaryTextColor flex items-center justify-center">
          <Logo className="w-4 h-4" />
        </div>
      </div>
      <div className="message-box-wrap pr-5">
        <div className="message-box text-primaryTextColor bg-white rounded-lg p-4">
          <div className="text-base whitespace-pre-line">
            {loading ? (
              <div class="three-body">
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
                <div class="three-body__dot"></div>
              </div>
            ) : (
              content
            )}
          </div>
          <div className="flex justify-end text-xs text-secondTextColor pt-2">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotMessage;
