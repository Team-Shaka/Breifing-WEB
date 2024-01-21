import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ReactComponent as GPT4 } from "../../assets/images/GPT_logo_blue.svg";
import ManagingHeader from "../../components/chatComs/ManagingHeader";
import { useRecoilState } from "recoil";
import { managingDateState } from "../../recoil/atoms/managingDateState";
import { ReactComponent as Left } from "../../assets/images/left.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import BriefingCardList from "../../components/homeComps/BriefingCardList";
import { categoryState } from "../../recoil/atoms/categoryState";
import SelectBar from "../../components/homeComps/SelectBar";
import BriefingCard from "../../components/homeComps/BriefingCard";

function BriefList() {
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["loggedIn"]);
    const [selectedDate] = useRecoilState(managingDateState);
    const [category, setCagetory] = useRecoilState(categoryState);
    const [isMorning, setIsMorning] = useState(true); // [true: 오전, false: 오후
    const [inputError, setInputError] = useState(false);
    const [briefings, setBriefings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState("");
    const timeOfDay = isMorning ? "Morning" : "Evening";

    const getType = () => {
        setIsLoading(false);
        if (category === 0) {
            return "SOCIAL";
        } else if (category === 1) {
            return "GLOBAL";
        } else if (category === 2) {
            return "ECONOMY";
        } else {
            return "SCIENCE";
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString); // 문자열을 Date 객체로 변환
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

    const handleTimeOfDayChange = (isMorningSelected) => {
        setIsMorning(isMorningSelected);
    };

    useEffect(() => {
        // console.log("selectedDate:", selectedDate);
        // console.log("Updated:", lastUpdate);
        // console.log("category:", category);
        // console.log("timeOfDay:", timeOfDay);

        // GET briefing list
        if (cookies.loggedIn) {
            setIsLoading(true);
            axios
                .get(
                    `${
                        process.env.REACT_APP_BASE_URL
                    }/v2/briefings?type=${getType()}&date=${formatDate(
                        selectedDate
                    )}&timeOfDay=${timeOfDay}`
                )
                .then((res) => {
                    setIsLoading(false);
                    if (res.data.isSuccess) {
                        const sorted = [...res.data.result.briefings].sort(
                            (a, b) => a.ranks - b.ranks
                        );
                        setBriefings(sorted);
                        setLastUpdate(res.data.result.createdAt);
                    } else {
                        console.error(res.data.code, res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("API 호출 오류: ", error);
                    setIsLoading(false);
                });
        }
    }, [selectedDate, cookies.loggedIn, category, isMorning]);

    useEffect(() => {
        if (briefings.length > 0) {
            console.log("Updated briefings:", briefings);
        }
    }, [briefings]);

    const handleLogin = (password) => {
        if (password === process.env.REACT_APP_MANAGING_PASSWORD) {
            const time = 3600; //1시간
            const expiration = new Date(Date.now() + time * 1000);
            setCookie("loggedIn", true, { path: "/", expires: expiration });
            setTimeout(() => {
                // 1시간 후에 알림창을 표시하고 페이지를 새로고침
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.reload();
            }, time * 1000); // 3초 후에 실행
        } else {
            setInputError(true);
        }
    };

    return (
        <div className="flex justify-center w-full">
            {cookies.loggedIn ? (
                // 로그인 후 페이지
                <div className="flex flex-col items-center sm:w-[1200px]">
                    <ManagingHeader showDatepicker={true} />
                    <div className=" overflow-y-auto flex flex-col items-center">
                        <div>
                            <button
                                className={`text-base sm:text-lg px-3 py-2 mx-2 ${
                                    isMorning
                                        ? "text-primaryBgColor"
                                        : " text-gray-400"
                                }`}
                                onClick={() => handleTimeOfDayChange(true)}
                            >
                                아침
                            </button>
                            <button
                                className={`text-base sm:text-lg px-3 py-2 mx-2 ${
                                    isMorning
                                        ? "text-gray-400"
                                        : " text-primaryBgColor"
                                }`}
                                onClick={() => handleTimeOfDayChange(false)}
                            >
                                저녁
                            </button>
                        </div>

                        <div>
                            <SelectBar />
                        </div>
                        {/* brief list */}
                        <div className="flex flex-col my-3 overflow-hidden">
                            {/* brief card */}
                            {isLoading ? (
                                <div className="text-black">Loading...</div>
                            ) : briefings.length === 0 ? (
                                <div className=" text-black">
                                    {selectedDate} 의 브리핑 데이터를 불러올 수
                                    없습니다.
                                </div>
                            ) : (
                                // briefing data is loaded
                                <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center gap-7">
                                    {briefings?.map((card) => (
                                        <Link
                                            key={card.id}
                                            className="w-full h-full "
                                            to={`/managing/briefing/${card.id}`}
                                        >
                                            <BriefingCard
                                                ranks={card.ranks}
                                                title={card.title}
                                                subtitle={card.subtitle}
                                            />
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // 로그인 전 페이지
                <div className=" h-screen bg-white flex flex-col justify-center items-center sm:w-[1200px]">
                    <div className=" text-primaryBgColor text-6xl font-bold">
                        Briefing
                    </div>
                    <div className="text-primaryBgColor text-lg mt-3">
                        Your Keyword Newskeeper.
                    </div>
                    <div className="flex items-center mt-3">
                        <GPT4 className=" w-4 h-4 mr-2" />
                        <div className="text-primaryBgColor">
                            Powered By GPT-4
                        </div>
                    </div>

                    <input
                        className={`input w-48 ${
                            inputError ? "input-bordered input-error" : ""
                        } max-w-xs mt-8 text-center border-0 border-b-2 border-primaryBgColor rounded-none focus:outline-none`}
                        type="password"
                        placeholder="Enter the Code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin(password);
                            }
                        }}
                    />
                    {inputError && (
                        <div className="mt-2 text-red-500">
                            패스워드가 틀렸습니다.
                        </div>
                    )}
                    <button
                        className="bg-primaryBgColor rounded-lg font-bold text-white mt-9 w-32 h-10"
                        onClick={() => handleLogin(password)}
                    >
                        ENTER
                    </button>
                </div>
            )}
        </div>
    );
}

export default BriefList;
