import React from "react";
import Header from "../components/homeComps/Header";
import Footer from "../components/homeComps/Footer";
import BriefingCardList from "../components/homeComps/BriefingCardList";
import IntroduceSection1 from "../components/homeComps/IntroduceSection1";

const Home = () => {
    return (
        <div>
            <Header />
            <BriefingCardList />
            <IntroduceSection1 />
            <Footer />
        </div>
    );
};

export default Home;
