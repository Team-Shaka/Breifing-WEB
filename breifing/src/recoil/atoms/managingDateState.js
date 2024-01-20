import { atom } from "recoil";

// 날짜 포맷팅 함수
const formatDate = (date) => {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }

    return [year, month, day].join("-");
};

// 현재 날짜 가져오기
const today = new Date();

export const managingDateState = atom({
    key: "managingDateState",
    // 오늘 날짜(YYYY-MM-DD)로 포맷팅
    default: formatDate(today),
});
