import React from "react";
import Header from "../../components/homeComps/Header";
import Footer from "../../components/homeComps/Footer";
import BriefingCardList from "../../components/homeComps/BriefingCardList";
import IntroduceSection1 from "../../components/homeComps/IntroduceSection1";
import IntroduceSection2 from "../../components/homeComps/IntroduceSection2";
import InstallSection from "../../components/homeComps/InstallSection";

const Home = () => {
    return (
        <div>
            <Header />
            <InstallSection />
            <div className="flex justify-center">
                <div className="sm:w-[1200px]">
                    <BriefingCardList />
                    <IntroduceSection1 />
                    <IntroduceSection2 />
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Home;
