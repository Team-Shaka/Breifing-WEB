import React, { useEffect, useState } from "react";
import { ReactComponent as Exit } from "../assets/images/exit.svg";
import ManagingDatePicker from "./ManagingDatePicker";
import { useCookies } from "react-cookie";

function ManagingHeader({ showDatepicker }) {
    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
    const handleLogout = () => {
        removeCookie("loggedIn", { path: "/" });
    };
    return (
        <div className="navbar bg-primaryBgColor">
            {/* 로고 */}
            <div className="navbar-start">
                <a className="btn btn-ghost no-animation normal-case text-xl text-white">
                    Briefing
                </a>
            </div>
            {/* 날짜 선택창 */}
            <div className="navbar-center">
                {showDatepicker && <ManagingDatePicker />}
            </div>
            {/* 나가기 버튼 */}
            <div className="navbar-end">
                <button
                    onClick={() => {
                        handleLogout();
                    }}
                    className="btn btn-ghost text-white border-none"
                >
                    나가기
                    <Exit className="w-9 h-9 pt-1 fill-white" />
                </button>
            </div>
        </div>
    );
}

export default ManagingHeader;
