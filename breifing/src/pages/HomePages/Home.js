import React from "react";
import Header from "../../components/homeComps/Header";
import Footer from "../../components/homeComps/Footer";
import BriefingCardList from "../../components/homeComps/BriefingCardList";
import IntroduceSection1 from "../../components/homeComps/IntroduceSection1";
import IntroduceSection2 from "../../components/homeComps/IntroduceSection2";
import InstallSection from "../../components/homeComps/InstallSection";
import { Helmet } from "react-helmet";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Briefing</title>
                <meta name="title" property="og:title" content="Briefing" />
                <meta
                    name="description"
                    property="og:description"
                    content="AI가 선정한 오늘의 키워드"
                />
                <meta
                    name="image"
                    property="og:image"
                    content={`${process.env.REACT_APP_BASE_URL}/imgs/Briefing.png`}
                />
                <meta
                    name="url"
                    property="og:url"
                    content={window.location.href}
                />
            </Helmet>
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
