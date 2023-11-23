import React from "react";
import { ReactComponent as IntroduceSection2Image } from "../../assets/images/introduceSection2_image.svg";

function IntroduceSection2() {
    return (
        <div className="flex flex-row px-0 lg:px-20 justify-center lg:justify-center items-center bg-white h-[338px] lg:h-[400px]">
            <IntroduceSection2Image className="hidden lg:block mx-12 h-56"></IntroduceSection2Image>
            <div className="flex flex-col w-2/3">
                <div className="text-left lg:text-right text-primaryBgColor text-[20px] lg:text-[35px] font-bold leading-tight">
                    요약된 정리와 키워드로 <br /> 트렌드를 따라가세요
                </div>
                <div className="text-[15px] lg:text-[20px] text-left lg:text-right mt-7">
                    완전히 자동화된 요약을 확인하고, 저장해보세요. <br />
                    <br /> AI가 자동으로 키워드를 제공하고, 당신을 위해
                    요약합니다.
                    <br /> 하루 단 5분을 통해서 간단하게 트렌드를 따라가 보세요.
                </div>
            </div>
        </div>
    );
}

export default IntroduceSection2;
