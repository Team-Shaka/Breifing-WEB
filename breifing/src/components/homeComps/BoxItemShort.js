import React from "react";

function BoxItemShort(props) {
    const subtitle =
        props.subtitle.length > 14
            ? props.subtitle.substring(0, 14) + "..."
            : props.subtitle;
    return (
        <div className="py-1 w-full h-[90px]">
            <div className="flex">
                <div className="font-bold text-xl pr-2 ">{props.rank}</div>
                <div className="font-bold text-xl pr-3 ">
                    {props.title}
                </div>{" "}
            </div>

            <div className="mt-1 ">
                {subtitle}{" "}
                <span className="text-[#B0B0B0] font-light">
                    {props.date} {props.timeOfDay}
                </span>
            </div>
        </div>
    );
}

export default BoxItemShort;
