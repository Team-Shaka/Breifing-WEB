import React from "react";
import { ReactComponent as Apple } from "../../assets/images/Apple.svg";
import { ReactComponent as GooglePlay } from "../../assets/images/GooglePlay.svg";
import { ReactComponent as InstallSectionImage } from "../../assets/images/installSection_image.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function InstallSection() {
    return (
        <div className="bg-primaryBgColor">
            <div className="flex flex-col lg:flex-row items-center h-[420px] lg:h-[462px] px-0 lg:px-20">
                {/* '당신의 AI 뉴스 리더'와 'Briefing'을 포함하는 div */}
                <div className="flex flex-col w-1/2 text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.5,
                            duration: 1,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="text-white text-base text-center lg:text-[45px] mt-6">
                            당신의 AI 뉴스 리더,
                        </div>
                        <div className="text-white text-center text-[50px] lg:text-[120px]">
                            Briefing
                        </div>
                    </motion.div>

                    {/* 앱 스토어 링크 버튼들 */}
                    <div className="flex justify-center mt-4 lg:mt-16">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.7,
                                duration: 1,
                                ease: "easeInOut",
                            }}
                        >
                            {" "}
                            {/* App Store 링크 */}
                            <Link to="https://apps.apple.com/kr/app/briefing/id6463561633">
                                <button className="btn btn-outline rounded-none normal-case w-[130px] lg:w-[175px] h-[35px] lg:h-[57px] text-sm lg:text-[20px] font-bold text-white mr-5 flex items-center justify-center whitespace-nowrap">
                                    <Apple className="w-[18px] h-[18px] lg:w-7 lg:h-7" />
                                    <div>App Store</div>
                                </button>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.7,
                                duration: 1,
                                ease: "easeInOut",
                            }}
                        >
                            {" "}
                            {/* Google Play 링크 */}
                            <Link to="https://play.google.com/store/apps/details?id=com.dev.briefing&pcampaignid=web_share">
                                <button className="btn btn-outline rounded-none normal-case w-[130px] lg:w-[175px] h-[35px] lg:h-[57px] text-sm lg:text-[20px] font-bold text-white flex items-center justify-center whitespace-nowrap">
                                    <GooglePlay className="w-[18px] h-[18px] lg:w-7 lg:h-7" />
                                    <div>Google Play</div>
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* InstallSectionImage를 포함하는 div */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
                    className="flex justify-center mt-9 lg:mt-auto lg:w-1/2"
                >
                    <InstallSectionImage className="w-[195px] h-[200px] lg:w-[417px] lg:h-[417px]" />
                </motion.div>
            </div>
        </div>
    );
}

export default InstallSection;
