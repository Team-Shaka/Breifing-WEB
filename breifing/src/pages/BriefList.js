import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ReactComponent as GPT4 } from "../assets/images/GPT_logo.svg";
import ManagingHeader from "../components/ManagingHeader";
import { useRecoilState } from "recoil";
import { managingDateState } from "../recoil/atoms/managingDateState";
import { ReactComponent as Left } from "../assets/images/left.svg";
import axios from "axios";
import { Link } from "react-router-dom";

function BriefList() {
    const [password, setPassword] = useState("");
    const [cookies, setCookie] = useCookies(["loggedIn"]);
    const [selectedDate] = useRecoilState(managingDateState);
    const [inputError, setInputError] = useState(false);
    const [briefings, setBriefings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        console.log("selectedDate:", selectedDate);

        // GET briefing list
        if (cookies.loggedIn) {
            setIsLoading(true);
            axios
                .get(
                    `https://dev.newsbreifing.store/briefings?type=KOREA&date=${selectedDate}`
                    // `https://dev.newsbreifing.store/briefings?type=KOREA&date=2023-10-20`
                )
                .then((res) => {
                    setIsLoading(false);

                    if (res.data.isSuccess) {
                        setBriefings(res.data.result.briefings);
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
    }, [selectedDate, cookies.loggedIn]);

    const handleLogin = (password) => {
        if (password === "1234") {
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
        <div>
            {cookies.loggedIn ? (
                // 로그인 후 페이지
                <div>
                    <ManagingHeader showDatepicker={true} />
                    <div className="h-screen overflow-y-auto bg-primaryBgColor flex flex-col items-center">
                        {/* YYYY.MM.DD 키워드 브리핑 */}
                        <div className="title lg:text-4xl sm:text-2xl text-white font-bold mt-3">
                            {selectedDate} 키워드 브리핑
                        </div>
                        <div className="lastUpdate text-gray-300 text-sm mt-3">
                            Updated: {lastUpdate}
                        </div>

                        {/* brief list */}
                        <div className="flex flex-col my-3">
                            {/* brief card */}
                            {isLoading ? (
                                <div className="text-white">Loading...</div>
                            ) : briefings.length === 0 ? (
                                <div className=" text-white">
                                    {selectedDate} 의 브리핑 데이터를 불러올 수
                                    없습니다.
                                </div>
                            ) : (
                                // briefing data is loaded
                                briefings.map((briefing, index) => (
                                    <Link to={`briefing/${briefing.id}`}>
                                        <div
                                            key={index}
                                            className="flex flex-row lg:h-20 sm:h-16 border-none bg-white mt-3 card rounded-box place-items-center"
                                        >
                                            <div className="briefing-rank lg:text-lg sm:text-base lg:px-8 sm:px-5 text-primaryTextColor">
                                                {briefing.ranks}
                                            </div>
                                            <div className="content-wrap w-full flex flex-col">
                                                <div className="briefing-title  lg:text-lg sm:text-base text-primaryTextColor">
                                                    {briefing.title}
                                                </div>
                                                <div className="briefing-subtitle lg:text-base sm:text-sm text-thirdTextColor">
                                                    {briefing.subtitle}
                                                </div>
                                            </div>
                                            {/* go to detail */}
                                            <Left className=" mx-5 w-7 h-7" />
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // 로그인 전 페이지
                <div className=" h-screen bg-primaryBgColor flex flex-col justify-center items-center">
                    <div className=" text-white text-6xl">Briefing</div>
                    <div className="text-white text-lg mt-3">
                        Your Keyword Newskeeper.
                    </div>
                    <div className="flex items-center mt-3">
                        <GPT4 className=" w-4 h-4 mr-2" />
                        <div className="text-white">Powered By GPT-4</div>
                    </div>

                    <input
                        className={`input w-48 ${
                            inputError ? "input-bordered input-error" : ""
                        } max-w-xs mt-8`}
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
                    <button
                        className="btn w-32 bg-white text-primaryBgColor mt-3"
                        onClick={() => handleLogin(password)}
                    >
                        Enter
                    </button>
                </div>
            )}
        </div>
    );
}

export default BriefList;
