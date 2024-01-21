import React from "react";
import { ReactComponent as Exit } from "../../assets/images/exit.svg";
import ManagingDatePicker from "./ManagingDatePicker";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

function ManagingHeader({ showDatepicker }) {
    const [cookies, setCookie, removeCookie] = useCookies(["loggedIn"]);
    const handleLogout = () => {
        removeCookie("loggedIn", { path: "/" });
    };
    return (
        <div className="navbar flex justify-evenly bg-white">
            {/* 로고 */}
            <div className="">
                <Link
                    to="/managing"
                    className="btn btn-ghost no-animation normal-case font-bold text-base sm:text-3xl text-primaryBgColor"
                >
                    Briefing
                </Link>
            </div>
            {/* 날짜 선택창 */}
            <div className="pb-2">
                {showDatepicker && <ManagingDatePicker />}
            </div>
            {/* 나가기 버튼 */}
            <div className="">
                <button
                    onClick={() => {
                        handleLogout();
                    }}
                    className="btn btn-ghost border-none"
                >
                    <div className="text-base font-bold sm:text-lg text-primaryBgColor">
                        나가기
                    </div>
                </button>
            </div>
        </div>
    );
}

export default ManagingHeader;
