import React from "react";
import { ReactComponent as IntroduceSection1Image } from "../../assets/images/introduceSection1_image.svg";
import { motion } from "framer-motion";

function IntroduceSection1() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
                ease: "easeInOut",
                duration: 2,
                y: { duration: 1 },
            }}
        >
            <div className="flex flex-row px-0 lg:px-20 justify-center items-center bg-white h-[338px] lg:h-[400px]">
                <div className="flex flex-col w-4/5">
                    <div className="text-left text-primaryBgColor text-[20px] lg:text-[35px] font-bold leading-tight">
                        뉴스를 파악하세요. <br />
                        쉽게, 빠르게, 중립적으로.
                    </div>
                    <div className="text-[15px] lg:text-[20px] mt-7">
                        하루에도 수 천개씩 새로운 뉴스가 나타납니다. <br />{" "}
                        이렇게 많은 뉴스들, 하나하나 다 읽기에는 아까운 당신을
                        위해, Briefing은 AI를 통해 뉴스를 요약합니다. <br />
                        <br />
                        자체적인 Absentral 프롬프팅을 통해, 중립적으로 선정된
                        주요 뉴스를 키워드와 함께 확인할 수 있습니다.
                    </div>
                </div>
                <IntroduceSection1Image className="hidden lg:block mx-12"></IntroduceSection1Image>
            </div>
        </motion.div>
    );
}

export default IntroduceSection1;
