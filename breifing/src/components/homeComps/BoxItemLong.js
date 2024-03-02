import React from "react";

function BoxItemLong(props) {
    const subtitle =
        props.subtitle.length > 20
            ? props.subtitle.substring(0, 20) + "..."
            : props.subtitle;
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center">
                {" "}
                <div className="font-bold text-xl pr-2 ">{props.rank}</div>
                <div className="font-bold text-xl pr-3 whitespace-nowrap">
                    {props.title}
                </div>
                <div className="overflow-hidden lg:w-44 whitespace-nowrap overflow-ellipsis">
                    {subtitle}
                </div>
            </div>

            <div className="text-[#B0B0B0] font-light ">
                {props.date} {props.timeOfDay}
            </div>
        </div>
    );
}

export default BoxItemLong;
