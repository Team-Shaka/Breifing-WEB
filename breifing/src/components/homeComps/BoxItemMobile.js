import React from "react";
import { ReactComponent as Scrap } from "../../assets/images/mingcute_bookmark-line.svg";

function BoxItemMobile() {
    return (
        <div className="flex-col">
            <div className="flex">
                <div className="font-bold text-xl pr-4 ">1</div>
                <div className="flex-col">
                    <div className="font-bold text-xl pr-3 ">배터리 혁명</div>{" "}
                    <div className="summary mt-2 text-[#7C7C7C] font-normal text-base">
                        2차 전지 혁명으로 인한 놀라운 발견과 문제 해결{" "}
                    </div>
                    <div className="flex items-center mt-4">
                        <Scrap className="w-4 h-4" />
                        <div className=" font-normal text-[#B6B6B6] text-sm">
                            1234
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxItemMobile;
