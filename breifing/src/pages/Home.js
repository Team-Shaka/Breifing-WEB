import React from 'react';
import Header from "../components/homeComps/Header";
import Footer from "../components/homeComps/Footer";
import BriefingCardList from '../components/homeComps/BriefingCardList';

const Home = () => {
    return (
        <div>
            <Header />
            <BriefingCardList />
            <Footer />
        </div>
    );
};

export default Home;