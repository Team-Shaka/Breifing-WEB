import React from "react";
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
                <a className="btn btn-ghost no-animation normal-case lg:font-bold sm:font-bold lg:text-xl sm:text-base text-white">
                    Briefing
                </a>
            </div>
            {/* 날짜 선택창 */}
            <div className="navbar-center pb-2">
                {showDatepicker && <ManagingDatePicker />}
            </div>
            {/* 나가기 버튼 */}
            <div className="navbar-end">
                <button
                    onClick={() => {
                        handleLogout();
                    }}
                    className="btn btn-ghost lg:text-xl sm:text-base text-white border-none"
                >
                    <div className="lg:inline sm:hidden pb-1">나가기</div>
                    <Exit className="lg:w-11 lg:h-11 sm:w-10 sm:h-10 pt-1 fill-white" />
                </button>
            </div>
        </div>
    );
}

export default ManagingHeader;
