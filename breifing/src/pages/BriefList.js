import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ReactComponent as GPT4 } from "../assets/images/GPT_logo.svg";
import ManagingHeader from "../components/ManagingHeader";
import { useRecoilState } from "recoil";
import { managingDateState } from "../recoil/atoms/managingDateState";
import { ReactComponent as Left } from "../assets/images/left.svg";

function BriefList() {
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
    const [selectedDate, setSelectedDate] = useRecoilState(managingDateState);
    const [inputError, setInputError] = useState(false);

    useEffect(() => {
        console.log("selectedDate:", selectedDate);
    }, [selectedDate]);

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
                    <div className="h-screen bg-primaryBgColor flex flex-col items-center pt-5">
                        {/* YYYY.MM.DD 키워드 브리핑 */}
                        <div className="title text-5xl md:text-4xl sm:text-2xl text-white font-bold">
                            {selectedDate} 키워드 브리핑
                        </div>
                        <div className="lastUpdate text-gray-300 text-sm mt-3">
                            Updated: 00.00.00 0AM
                        </div>

                        {/* brief list */}
                        <div className="flex flex-col w-2/3 mt-3">
                            {/* brief card */}
                            <div className="flex flex-row h-20 border-none bg-white mt-3 card rounded-box place-items-center">
                                <div className="brief-rank text-lg px-8 text-primaryTextColor">
                                    1
                                </div>
                                <div className="content-wrap w-full flex flex-col">
                                    <div className=" text-lg font-bold text-primaryTextColor">
                                        배터리 혁명
                                    </div>
                                    <div className=" text-smfont-bold text-secondTextColor">
                                        2차 전지 혁명으로 인한 놀라운 발전과...
                                    </div>
                                </div>
                                {/* go to detail */}
                                <Left className=" mx-5 w-7 h-7" />
                            </div>
                            <div className="flex flex-row h-20 border-none bg-white mt-3 card rounded-box place-items-center">
                                <div className="brief-rank text-lg px-8 text-primaryTextColor">
                                    2
                                </div>
                                <div className="content-wrap w-full flex flex-col">
                                    <div className=" text-lg font-bold text-primaryTextColor">
                                        배터리 혁명
                                    </div>
                                    <div className=" text-smfont-bold text-secondTextColor">
                                        2차 전지 혁명으로 인한 놀라운 발전과...
                                    </div>
                                </div>
                                {/* go to detail */}
                                <Left className=" mx-5 w-7 h-7" />
                            </div>
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
