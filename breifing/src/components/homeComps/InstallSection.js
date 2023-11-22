import React from "react";
import { ReactComponent as Apple } from "../../assets/images/Apple.svg";
import { ReactComponent as GooglePlay } from "../../assets/images/GooglePlay.svg";
import { ReactComponent as InstallSectionImage } from "../../assets/images/installSection_image.svg";

function InstallSection() {
    return (
        <div className="flex justify-center items-center row h-[462px] px-24  bg-primaryBgColor">
            <div className="flex flex-col  w-1/2 text-left">
                <div className="text-white text-[45px]">
                    당신의 AI 뉴스 리더,
                </div>
                <div className="text-white text-[120px]">Briefing</div>
                <div className="flex mt-16">
                    <button className="btn btn-outline rounded-none normal-case w-[175px] h-[57px] text-[20px] font-bold text-white mr-5">
                        <Apple className=" w-7 h-7" />
                        App Store
                    </button>
                    <button className="btn btn-outline rounded-none	normal-case w-[175px] h-[57px] text-[20px] font-bold text-white">
                        <GooglePlay className="w-7 h-7" />
                        Google Play
                    </button>
                </div>
            </div>
            <div className="flex justify-center mt-auto w-1/2">
                <InstallSectionImage />
            </div>
        </div>
    );
}

export default InstallSection;
