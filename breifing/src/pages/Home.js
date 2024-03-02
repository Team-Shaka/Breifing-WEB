import React from "react";
import Header from "../components/aboutComps/Header";
import SocialBox from "../components/homeComps/SocialBox";
import { GlobalBox } from "../components/homeComps/GlobalBox";
import { EconomyBox } from "../components/homeComps/EconomyBox";
import { ScienceBox } from "../components/homeComps/ScienceBox";

const Home = () => {
    return (
        <div>
            <Header />
            <SocialBox />
            <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
            <GlobalBox />
            <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
            <EconomyBox />
            <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
            <ScienceBox />
        </div>
    );
};

export default Home;
