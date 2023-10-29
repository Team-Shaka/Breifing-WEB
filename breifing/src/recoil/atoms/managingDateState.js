import { atom } from "recoil";

export const managingDateState = atom({
    key: "managingDateState",
    // 오늘 날짜(YYYY-MM-DD)
    default: `${new Date().getFullYear()}-${
        new Date().getMonth() + 1
    }-${new Date().getDate()}`,
});
