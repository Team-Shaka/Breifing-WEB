import React, { useEffect } from "react";
import BoxItemShort from "./BoxItemShort";
import BoxItemLong from "./BoxItemLong";
import BoxItemMobile from "./BoxItemMobile";
import { useRecoilState, useRecoilValue } from "recoil";
import { briefingsListState } from "../../recoil/atoms/briefingListState";
import axios from "axios";

function MobileSocialBox() {
    return (
        <div className="flex-col">
            {/* Title */}
            <div className="flex items-center">
                {" "}
                <div className="text-base font-bold mr-2">사회</div>
                <div className="text-sm font-normal text-[#B0B0B0]">
                    AI가 선정한 오늘의 사회 키워드
                </div>
            </div>
            {/* Cards */}
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
            <div className="p-5">
                <BoxItemMobile />
            </div>
            <div className="bg-[#B6B6B6] h-[1px]"></div>
        </div>
    );
}

function DesktopSocialBox() {
    const briefingList = useRecoilValue(briefingsListState);

    const rightSectionBriefings = briefingList.slice(4, 10);

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
                                {briefingList.length > 0 && (
                                    <BoxItemShort
                                        rank={briefingList[0].ranks}
                                        title={briefingList[0].title}
                                        subtitle={briefingList[0].subtitle}
                                    />
                                )}
                                <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                                {briefingList.length > 0 && (
                                    <BoxItemShort
                                        rank={briefingList[1].ranks}
                                        title={briefingList[1].title}
                                        subtitle={briefingList[1].subtitle}
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
                            {briefingList.length > 0 && (
                                <BoxItemShort
                                    rank={briefingList[2].ranks}
                                    title={briefingList[2].title}
                                    subtitle={briefingList[2].subtitle}
                                />
                            )}
                            <div className="bg-[#B6B6B6] w-[1px] mx-7"></div>
                            {briefingList.length > 0 && (
                                <BoxItemShort
                                    rank={briefingList[3].ranks}
                                    title={briefingList[3].title}
                                    subtitle={briefingList[3].subtitle}
                                />
                            )}
                        </div>
                    </div>
                    <div className="hidden lg:block bg-[#B6B6B6] w-[1px] mx-7 h-full"></div>
                    <div className="lg:hidden bg-[#B6B6B6] h-[1px] my-4"></div>
                    {/* Right Section */}
                    <div className="w-full">
                        {rightSectionBriefings.map((briefing) => (
                            <React.Fragment key={briefing.id}>
                                <BoxItemLong
                                    rank={briefing.ranks}
                                    title={briefing.title}
                                    subtitle={briefing.subtitle}
                                />
                                <div className="bg-[#B6B6B6] h-[1px] my-4"></div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SocialBox() {
    const [briefingList, setBriefingList] = useRecoilState(briefingsListState);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/briefings?type=SOCIAL&date=2024-03-01`
            )
            .then((response) => {
                const data = response.data;
                if (data.isSuccess && data.result?.briefings) {
                    setBriefingList(data.result.briefings);
                }
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the briefings:",
                    error
                );
            });
    }, [setBriefingList]);

    return (
        <div className="xl:w-[1200px] p-2 mx-auto">
            <div className="sm:hidden">
                <MobileSocialBox />
            </div>
            <div className="hidden sm:block">
                <DesktopSocialBox />
            </div>
        </div>
    );
}

export default SocialBox;
