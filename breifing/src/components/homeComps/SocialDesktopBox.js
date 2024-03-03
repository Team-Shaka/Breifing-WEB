import React from "react";
import BoxItemShort from "./BoxItemShort";
import BoxItemLong from "./BoxItemLong";
import { useRecoilValue } from "recoil";
import { socialBriefingState } from "../../recoil/atoms/briefingListState";
import {
    dateState,
    timeOfDayState,
} from "../../recoil/atoms/managingDateState";

export function SocialDesktopBox() {
    let briefingList = useRecoilValue(socialBriefingState);
    let date = useRecoilValue(dateState);
    let timeOfDay = useRecoilValue(timeOfDayState);

    // Filling the array with empty objects to make sure the length is 10
    const filledBriefingList = [...briefingList];
    while (filledBriefingList.length < 10) {
        filledBriefingList.push({ ranks: filledBriefingList.length + 1 });
    }

    const rightSectionBriefings = filledBriefingList.slice(4, 10);

    return (
        <div className="flex flex-col pb-11 ">
            {/* Title */}
            <div className="flex items-center">
                {" "}
                <div className="text-base font-bold mr-2">사회</div>
                <div className="text-sm font-normal text-[#B0B0B0]">
                    AI가 선정한 오늘의 사회 키워드
                </div>
            </div>
            {/* Cards */}
            <div className="flex justify-around mt-3">
                <div className="lg:flex w-full">
                    {/* Left Section */}
                    <div className="w-full flex flex-col">
                        <div className="flex w-full">
                            <div className="flex-col w-1/2">
                                {" "}
                                {filledBriefingList.length > 0 && (
                                    <BoxItemShort
                                        id={filledBriefingList[0].id}
                                        rank={
                                            filledBriefingList[0].ranks ||
                                            "No data"
                                        }
                                        title={
                                            filledBriefingList[0].title ||
                                            "No data"
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
                                )}
                                <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                                {filledBriefingList.length > 0 && (
                                    <BoxItemShort
                                        id={filledBriefingList[1].id}
                                        rank={
                                            filledBriefingList[1].ranks ||
                                            "No data"
                                        }
                                        title={
                                            filledBriefingList[1].title ||
                                            "No data"
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
                                )}
                            </div>
                            <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>
                            <div className=" w-1/2 flex justify-center items-center bg-pink-50">
                                Image
                            </div>
                        </div>
                        <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                        <div className="flex">
                            {" "}
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id={filledBriefingList[2].id}
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
                            )}
                            <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>
                            {filledBriefingList.length > 0 && (
                                <BoxItemShort
                                    id={filledBriefingList[3].id}
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
                            )}
                        </div>
                    </div>
                    <div className="hidden lg:block bg-[#B6B6B6] w-[1px] mx-7 h-full"></div>
                    <div className="lg:hidden bg-[#B6B6B6] h-[1px] my-4"></div>
                    {/* Right Section */}
                    <div className="w-full">
                        {rightSectionBriefings.map((briefing, index) => (
                            <React.Fragment key={index}>
                                <BoxItemLong
                                    id={briefing.id}
                                    rank={briefing.ranks || "No data"}
                                    title={briefing.title || "No data"}
                                    subtitle={briefing.subtitle || "No data"}
                                    date={date}
                                    timeOfDay={
                                        timeOfDay === "Morning"
                                            ? "오전"
                                            : "오후"
                                    }
                                />
                                {index < rightSectionBriefings.length - 1 && (
                                    <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                                )}{" "}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
