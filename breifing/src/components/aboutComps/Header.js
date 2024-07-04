import React, { useState } from "react";
import { BsPerson } from "react-icons/bs";

import { Link, useLocation, useNavigate } from "react-router-dom";
import SelectBar from "./SelectBar";

export function cls(...classnames) {
  return classnames.join(" ");
}

const Header = () => {
  const today = new Date();
  const [menuClick, setMenuClick] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="xl:w-[1200px] w-full p-2  bg-white">
        <div className="flex justify-between items-center pb-2 xs:pb-0">
          <div className="flex items-center space-x-3">
            <button className="btn btn-square btn-ghost">
              <svg
                onClick={() => setMenuClick((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className=" w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <button className="hidden xs:inline-block btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="hidden xs:inline-block w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
          <div onClick={() => navigate("/")} className="visible xs:invisible text-primaryBgColor font-bold text-lg cursor-pointer">
            Briefing
          </div>
          <div>
            <BsPerson size={30} />
          </div>
        </div>
        <div className="hidden xs:flex justify-between items-end py-2 pb-4">
          <div className="text-sm">
            <div className="font-bold">
              {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}
              일
            </div>
            <div>오늘의 키워드</div>
          </div>
          <div
            onClick={scrollToTop}
            className="text-6xl font-bold text-primaryBgColor cursor-pointer"
          >
            Briefing
          </div>
          <div className="opacity-0">dfsdfsdfdfs</div>
        </div>
        <SelectBar />

        <div
          className={cls(
            "",
            menuClick ? "fixed left-0 top-0 inline-block " : "hidden "
          )}
        >
          <div
            onClick={() => setMenuClick(false)}
            className={cls(
              " absolute top-0 left-0  h-screen w-screen bg-black bg-opacity-20 ",
              menuClick ? "inline-block" : "hidden"
            )}
          ></div>
          <ul className="absolute scroll top-0 left-0  menu bg-white w-56 [&_li>*]:rounded-none h-screen shadow-xl font-bold">
            <div className="text-right">
              <button
                onClick={() => setMenuClick(false)}
                className="btn btn-ghost text-red-500 text-right py-2"
              >
                Exit
              </button>
            </div>

            <li>
              <a
                onClick={() => {
                  navigate("/");
                  setMenuClick(false);
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  window.open("https://linktr.ee/briefingnews");
                }}
              >
                About Briefing
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  window.open(
                    "https://onve.notion.site/Team-shaka-75de92ed8c724c6ea9fd5661bb03d1c5?pvs=4"
                  );
                }}
              >
                About Team Shaka
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
