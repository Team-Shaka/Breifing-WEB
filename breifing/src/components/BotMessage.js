import React from "react";
import { ReactComponent as Logo } from "../../src/assets/images/logo.svg";

function BotMessage({ content, time }) {
    function formatTime(timeString) {
        const [datePart, timePart] = timeString.split("T");
        const [year, month, day] = datePart.split("/");
        const [hours, minutes] = timePart.split(":");

        const parsedHours = parseInt(hours);
        const period = parsedHours >= 12 ? "오후" : "오전";
        const formattedHours = parsedHours % 12 === 0 ? 12 : parsedHours % 12;
        const formattedMinutes =
            parseInt(minutes) === 0 ? "0" : parseInt(minutes);

        return `${period} ${formattedHours}시 ${formattedMinutes}분`;
    }

    const formattedTime = formatTime(time);
    console.log(formattedTime);

    return (
        <div className="flex py-2">
            <div className="chat-profile-wrap px-3">
                <div className=" w-9 h-9 rounded-full border-2 border-primaryTextColor flex items-center justify-center">
                    <Logo className="w-4 h-4" />
                </div>
            </div>
            <div className="message-box-wrap pr-5">
                <div className="message-box text-primaryTextColor bg-white rounded-lg p-4">
                    <div className="text-base">{content}</div>
                    <div className="flex justify-end text-xs text-secondTextColor">
                        {formattedTime}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BotMessage;
