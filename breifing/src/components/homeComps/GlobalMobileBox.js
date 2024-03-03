import React from "react";
import BoxItemMobile from "./BoxItemMobile";
import { useRecoilValue } from "recoil";
import {
    globalBriefingState,
} from "../../recoil/atoms/briefingListState";

export default function GlobalMobileBox() {
    let briefingList = useRecoilValue(globalBriefingState);
    console.log(briefingList);

    // Filling the array with empty objects to make sure the length is 10
    const filledBriefingList = [...briefingList];
    while (filledBriefingList.length < 10) {
        filledBriefingList.push({ ranks: filledBriefingList.length + 1 });
    }

    return (
        <div className="flex-col">
            {/* Title */}
            <div className="flex items-center">
                {" "}
                <div className="text-base font-bold mr-2">글로벌</div>
                <div className="text-sm font-normal text-[#B0B0B0]">
                    AI가 선정한 오늘의 글로벌 키워드
                </div>
            </div>
            {/* Cards */}
            {filledBriefingList.length > 0 &&
                filledBriefingList.map((briefing, index) => (
                    <React.Fragment key={index}>
                        <div className="p-5">
                            <BoxItemMobile
                                id={briefing.id}
                                rank={briefing.ranks || "No data"}
                                title={briefing.title || "No data"}
                                subtitle={briefing.subtitle || "No data"}
                                scrapCount={briefing.scrapCount || "0"}
                            />
                        </div>
                        {index < filledBriefingList.length - 1 && (
                            <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                        )}{" "}
                    </React.Fragment>
                ))}
        </div>
    );
}
