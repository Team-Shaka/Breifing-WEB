import React from "react";

function BoxItemShort(props) {
    return (
        <div className="py-1 w-full">
            <div className="flex">
                <div className="font-bold text-xl pr-2 ">{props.rank}</div>
                <div className="font-bold text-xl pr-3 ">
                    {props.title}
                </div>{" "}
            </div>

            <div className="summary mt-1">
                {props.subtitle}{" "}
                <span className="text-[#B0B0B0] font-light">
                    2024.02.05 오전
                </span>
            </div>
        </div>
    );
}

export default BoxItemShort;
