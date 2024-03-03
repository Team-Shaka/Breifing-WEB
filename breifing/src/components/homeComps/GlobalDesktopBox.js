import React from "react";
import BoxItemShort from "./BoxItemShort";
import BoxItemLong from "./BoxItemLong";
import { useRecoilValue } from "recoil";
import {
    globalBriefingState,
    socialBriefingState,
} from "../../recoil/atoms/briefingListState";
import {
    dateState,
    timeOfDayState,
} from "../../recoil/atoms/managingDateState";

export default function GlobalDesktopBox() {
    let briefingList = useRecoilValue(globalBriefingState);
    let date = useRecoilValue(dateState);
    let timeOfDay = useRecoilValue(timeOfDayState);

    // Filling the array with empty objects to make sure the length is 10
    const filledBriefingList = [...briefingList];
    while (filledBriefingList.length < 10) {
        filledBriefingList.push({ ranks: filledBriefingList.length + 1 });
    }

    const rightSectionBriefings = filledBriefingList.slice(6, 10);

    return (
        <div className="flex flex-col pb-11 ">
            {/* Title */}
            <div className="flex items-center">
                {" "}
                <div className="text-base font-bold mr-2">글로벌</div>
                <div className="text-sm font-normal text-[#B0B0B0]">
                    AI가 선정한 오늘의 글로벌 키워드
                </div>
            </div>
            {/* Cards */}
            <div className="flex justify-around mt-3">
                <div className="lg:flex w-full">
                    {/* Left Section */}
                    <div className="w-full flex">
                        <div className="flex-col w-1/2">
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[0].id}
                                    rank={
                                        filledBriefingList[0].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[0].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[0].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[1].id}
                                    rank={
                                        filledBriefingList[1].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[1].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[1].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[2].id}
                                    rank={
                                        filledBriefingList[2].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[2].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[2].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                        </div>
                        {/* 세로 구분선 */}
                        <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>

                        <div className="flex-col w-1/2">
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[3].id}
                                    rank={
                                        filledBriefingList[3].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[3].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[3].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[4].id}
                                    rank={
                                        filledBriefingList[4].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[4].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[4].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[5].id}
                                    rank={
                                        filledBriefingList[5].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[5].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[5].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                        </div>
                    </div>
                    <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>
                    <div className="lg:hidden bg-[#B6B6B6] h-[1px] my-4"></div>

                    {/* Right Section */}
                    <div className="w-full flex">
                        {" "}
                        <div className="flex-col w-7/12">
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[6].id}
                                    rank={
                                        filledBriefingList[6].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[6].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[6].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[7].id}
                                    rank={
                                        filledBriefingList[7].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[7].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[7].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[8].id}
                                    rank={
                                        filledBriefingList[8].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[8].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[8].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                        </div>
                        {/* 세로 구분선 */}
                        <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>
                        <div className="flex-col w-5/12">
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id = {filledBriefingList[9].id}
                                    rank={
                                        filledBriefingList[9].ranks || "No data"
                                    }
                                    title={
                                        filledBriefingList[9].title || "No data"
                                    }
                                    subtitle={
                                        filledBriefingList[9].subtitle ||
                                        "No data"
                                    }
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                            )}{" "}
                            <div className="w-full h-[200px] mt-[12px] flex justify-center items-center bg-pink-50">
                                Image
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
