import React from "react";
import Header from "../components/aboutComps/Header";
import SocialBox from "../components/homeComps/SocialBox";
import { GlobalBox } from "../components/homeComps/GlobalBox";

const Home = () => {
    return (
        <div>
            <Header />
            <SocialBox />
            <GlobalBox />
        </div>
    );
};

export default Home;
