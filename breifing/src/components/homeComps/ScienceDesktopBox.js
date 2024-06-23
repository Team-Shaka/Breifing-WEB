import React from "react";
import BoxItemShort from "./BoxItemShort";
import BoxItemLong from "./BoxItemLong";

export function ScienceDesktopBox({ briefingList, date, timeOfDay }) {
  // Filling the array with empty objects to make sure the length is 10
  const filledBriefingList = [...briefingList];
  while (filledBriefingList.length < 10) {
    filledBriefingList.push({ ranks: filledBriefingList.length + 1 });
  }

  const leftSectionBriefings = filledBriefingList.slice(0, 6);
  const rightSectionBriefings = filledBriefingList.slice(6, 10);

  return (
    <div className="flex flex-col pb-11 ">
      {/* Title */}
      <div className="flex items-center">
        {" "}
        <div className="text-base font-bold mr-2">과학</div>
        <div className="text-sm font-normal text-[#B0B0B0]">
          AI가 선정한 오늘의 과학 키워드
        </div>
      </div>
      {/* Cards */}
      <div className="flex justify-around mt-3">
        <div className="lg:flex w-full">
          {/* Left Section */}
          <div className="w-full">
            {leftSectionBriefings.map((briefing, index) => (
              <React.Fragment key={index}>
                <BoxItemLong
                  rank={briefing.ranks || "No data"}
                  title={briefing.title || "No data"}
                  subtitle={briefing.subtitle || "No data"}
                  date={date}
                  timeOfDay={timeOfDay === "Morning" ? "오전" : "오후"}
                />
                {index < leftSectionBriefings.length - 1 && (
                  <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                )}{" "}
              </React.Fragment>
            ))}
          </div>
          <div className="hidden lg:block bg-[#B6B6B6] w-[1px] mx-7 h-full"></div>
          <div className="lg:hidden bg-[#B6B6B6] h-[1px] my-4"></div>
          {/* Right Section */}
          <div className="w-full flex flex-col">
            <div className="flex w-full">
              <div className="flex-col w-1/2">
                {" "}
                {filledBriefingList.length > 0 && (
                  <BoxItemShort
                    rank={filledBriefingList[6].ranks || "No data"}
                    title={filledBriefingList[6].title || "No data"}
                    subtitle={filledBriefingList[6].subtitle || "No data"}
                    date={date}
                    timeOfDay={timeOfDay === "Morning" ? "오전" : "오후"}
                  />
                )}
                <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                {filledBriefingList.length > 0 && (
                  <BoxItemShort
                    rank={filledBriefingList[7].ranks || "No data"}
                    title={filledBriefingList[7].title || "No data"}
                    subtitle={filledBriefingList[7].subtitle || "No data"}
                    date={date}
                    timeOfDay={timeOfDay === "Morning" ? "오전" : "오후"}
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
                  rank={filledBriefingList[8].ranks || "No data"}
                  title={filledBriefingList[8].title || "No data"}
                  subtitle={filledBriefingList[8].subtitle || "No data"}
                  date={date}
                  timeOfDay={timeOfDay === "Morning" ? "오전" : "오후"}
                />
              )}
              <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>
              {filledBriefingList.length > 0 && (
                <BoxItemShort
                  rank={filledBriefingList[9].ranks || "No data"}
                  title={filledBriefingList[9].title || "No data"}
                  subtitle={filledBriefingList[9].subtitle || "No data"}
                  date={date}
                  timeOfDay={timeOfDay === "Morning" ? "오전" : "오후"}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
