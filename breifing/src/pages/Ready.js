import React from "react";
import loading from "../assets/images/loading.png";

function Ready() {
    return (
        <div className=" bg-secondBgColor w-full h-screen flex flex-col justify-center items-center">
            <img className=" w-16 h-16 mb-10" src={loading} alt="loading"></img>
            <div className="font-semibold text-lg mb-5">
                현재 페이지는{" "}
                <span className="text-primaryBgColor">준비중</span> 입니다.
            </div>
            <div className="text-base">
                빠른 시일내에 준비하여 찾아뵙겠습니다.
            </div>
        </div>
    );
}

export default Ready;
