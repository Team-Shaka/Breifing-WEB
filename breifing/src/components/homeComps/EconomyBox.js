import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    economyBriefingState,
    socialBriefingState,
} from "../../recoil/atoms/briefingListState";
import axios from "axios";
import {
    dateState,
    timeOfDayState,
} from "../../recoil/atoms/managingDateState";
import GlobalMobileBox from "./GlobalMobileBox";
import GlobalDesktopBox from "./GlobalDesktopBox";
import EconomyDesktopBox from "./EconomyDesktopBox";
import EconomyMobileBox from "./EconomyMobileBox";

export function EconomyBox() {
    const [briefingList, setBriefingList] =
        useRecoilState(economyBriefingState);
    const date = useRecoilValue(dateState);
    const timeOfDay = useRecoilValue(timeOfDayState);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=ECONOMY&date=${date}&timeOfDay=${timeOfDay}`
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
                <EconomyMobileBox />
            </div>
            <div className="hidden sm:block">
                <EconomyDesktopBox />
            </div>
        </div>
    );
}
