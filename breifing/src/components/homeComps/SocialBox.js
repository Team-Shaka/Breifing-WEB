import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { socialBriefingState } from "../../recoil/atoms/briefingListState";
import axios from "axios";
import {
    dateState,
    timeOfDayState,
} from "../../recoil/atoms/managingDateState";
import DesktopBox, { SocialDesktopBox } from "./SocialDesktopBox";
import MobileBox, { SocialMobileBox } from "./SocialMobileBox";

export default function SocialBox() {
    const [briefingList, setBriefingList] = useRecoilState(socialBriefingState);
    const date = useRecoilValue(dateState);
    const timeOfDay = useRecoilValue(timeOfDayState);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SOCIAL&date=${date}&timeOfDay=${timeOfDay}`
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
        // Log the latest state of briefingList
        console.log(briefingList);
    }, [setBriefingList]);

    return (
        <div className="xl:w-[1200px] p-2 mx-auto">
            <div className="sm:hidden">
                <SocialMobileBox />
            </div>
            <div className="hidden sm:block">
                <SocialDesktopBox />
            </div>
        </div>
    );
}
