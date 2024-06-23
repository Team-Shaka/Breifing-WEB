import React from "react";
import { useRecoilState } from "recoil";
import { dateState, timeOfDayState } from "../recoil/atoms/managingDateState";

function SetDateAndTimeOfDay() {
    const [date, setDate] = useRecoilState(dateState);
    const [timeOfDay, setTimeOfDay] = useRecoilState(timeOfDayState);

    React.useEffect(() => {
        const today = new Date();
        let formattedDate = today.toISOString().split("T")[0];
        let timeOfDay = "Morning";

        const currentHour = today.getHours();

        if (currentHour < 5) {
            today.setDate(today.getDate() - 1);
            formattedDate = today.toISOString().split("T")[0];
            timeOfDay = "Evening";
        } else if (currentHour >= 17) {
            timeOfDay = "Evening";
        }

        setDate(formattedDate);
        setTimeOfDay(timeOfDay);
    }, []);

    return null;
}

export default SetDateAndTimeOfDay;
