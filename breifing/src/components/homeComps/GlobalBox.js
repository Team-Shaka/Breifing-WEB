import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    globalBriefingState,
} from "../../recoil/atoms/briefingListState";
import axios from "axios";
import {
    dateState,
    timeOfDayState,
} from "../../recoil/atoms/managingDateState";
import GlobalMobileBox from "./GlobalMobileBox";
import GlobalDesktopBox from "./GlobalDesktopBox";

export function GlobalBox() {
    const [briefingList, setBriefingList] = useRecoilState(globalBriefingState);
    const date = useRecoilValue(dateState);
    const timeOfDay = useRecoilValue(timeOfDayState);

    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=GLOBAL&date=${date}&timeOfDay=${timeOfDay}`
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
                <GlobalMobileBox />
            </div>
            <div className="hidden sm:block">
                <GlobalDesktopBox />
            </div>
        </div>
    );
}
