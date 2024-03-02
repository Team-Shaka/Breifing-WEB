import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    scienceBriefingState,
    socialBriefingState,
} from "../../recoil/atoms/briefingListState";
import axios from "axios";
import {
    dateState,
    timeOfDayState,
} from "../../recoil/atoms/managingDateState";
import DesktopBox, { SocialDesktopBox } from "./SocialDesktopBox";
import MobileBox, { SocialMobileBox } from "./SocialMobileBox";
import { ScienceMobileBox } from "./ScienceMobileBox";
import { ScienceDesktopBox } from "./ScienceDesktopBox";

export function ScienceBox() {
    const [briefingList, setBriefingList] =
        useRecoilState(scienceBriefingState);
    const date = useRecoilValue(dateState);
    const timeOfDay = useRecoilValue(timeOfDayState);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SCIENCE&date=${date}&timeOfDay=${timeOfDay}`
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
                <ScienceMobileBox />
            </div>
            <div className="hidden sm:block">
                <ScienceDesktopBox />
            </div>
        </div>
    );
}
