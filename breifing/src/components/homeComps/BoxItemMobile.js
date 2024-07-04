import React from "react";
import { ReactComponent as ViewIcon } from "../../assets/images/akar-icons_eye.svg";
import { Link } from "react-router-dom";

function BoxItemMobile(props) {
  return (
    <Link to={`/briefingCard/${props.id}`} className="flex-col">
      <div className="flex">
        <div className="font-bold text-xl pr-4 ">{props.rank}</div>
        <div className="flex-col">
          <div className="font-bold text-xl pr-3 ">{props.title}</div>{" "}
          <div className="summary mt-2 text-[#7C7C7C] font-normal text-base">
            {props.subtitle}{" "}
          </div>
          <div className="flex items-center mt-4">
            <ViewIcon className="w-4 h-4 pr-1" />
            <div className=" font-normal text-[#B6B6B6] text-sm">
              {props.viewCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BoxItemMobile;
