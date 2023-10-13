import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ReactComponent as GPT4 } from "../assets/images/GPT_logo.svg";

function BriefList() {
    const [password, setPassword] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);

    const handleLogin = (password) => {
        if (password === "1234") {
            const time = 3;
            const expiration = new Date(Date.now() + time * 1000);
            setCookie("loggedIn", true, { path: "/", expires: expiration });
            setTimeout(() => {
                // 3초 후에 알림창을 표시하고 페이지를 새로고침
                // alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                window.location.reload();
            }, time * 1000); // 3초 후에 실행
        }
    };

    const handleLogout = () => {
        removeCookie("loggedIn", { path: "/" });
    };

    return (
        <div>
            {cookies.loggedIn ? (
                // 로그인 후 페이지
                <div>
                    <div>Admin Page</div>
                    <button className="btn" onClick={handleLogout}>
                        나가기
                    </button>
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
                        className="input w-full max-w-xs mt-8"
                        type="password"
                        placeholder="Enter the Code"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
