import React from "react";
import Header from "../components/aboutComps/Header";
import SocialBox from "../components/homeComps/SocialBox";
import { GlobalBox } from "../components/homeComps/GlobalBox";
import { EconomyBox } from "../components/homeComps/EconomyBox";
import { ScienceBox } from "../components/homeComps/ScienceBox";
import { useRecoilState } from "recoil";
import { categoryState } from "../recoil/atoms/categoryState";

const Home = () => {
    const [category, setCategory] = useRecoilState(categoryState)


    return (
        <div>
            <Header />
            {category === "전체" || category === "사회" ?
                <div>
                    <SocialBox />
                    <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
                </div>
                :
                null
            }
            {category === "전체" || category === "글로벌" ?
                <div>
                    <GlobalBox />
                    <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>

                </div>
                :
                null
            }
            {category === "전체" || category === "경제" ?
                <div>
                    <EconomyBox />
                    <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>

                </div>
                :
                null
            }
            {category === "전체" || category === "과학" ?
                <div>
                    <ScienceBox />
                    <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>

                </div>
                :
                null
            }
        </div>
    );
};

export default Home;
