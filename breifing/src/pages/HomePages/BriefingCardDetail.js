import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/homeComps/Header";
import Footer from "../../components/homeComps/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";

const BriefingCardDetail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const handleOpenNewTab = (url) => {
        window.open(url);
    };
    useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/v2/briefings/${window.atob(
                    id
                )}`
            )
            .then((res) => {
                console.log(res);
                setData(res.data.result);
                setLoading(true);
            })
            .catch((err) => console.log(err));
    }, [id]);

    const renderHelmet = () => {
        if (!data) return;

        const title = `${data.title} | Briefing`;
        const description = data.subtitle;
        const imageUrl = `${process.env.REACT_APP_BASE_URL}/imgs/Briefing.png`;
        const url = `${window.location.href}`; // 현재 페이지 URL

        return (
            <Helmet>
                <title>{title}</title>
                <meta name="title" property="og:title" content={title} />
                <meta
                    name="description"
                    property="og:description"
                    content={description}
                />
                <meta name="image" property="og:image" content={imageUrl} />
                <meta name="url" property="og:url" content={url} />
            </Helmet>
        );
    };

    return (
        <div className="h-screen flex flex-col bg-white">
            {renderHelmet()}
            <Header />
            <div className="flex-1 p-5 flex justify-center mt-14">
                {loading ? (
                    <div className="sm:w-[768px]">
                        <div className="flex flex-col border-b space-y-2 pb-2">
                            <span className="font-bold text-3xl">
                                {data.title}
                            </span>
                            <span className="text-[#7C7C7C] text-sm">
                                {data.date} |{" "}
                                {data.type === "SOCIAL"
                                    ? "사회"
                                    : data.type === "GLOBAL"
                                    ? "글로벌"
                                    : data.type === "ECONOMY"
                                    ? "경제"
                                    : data.type === "SCIENCE"
                                    ? "과학"
                                    : ""}{" "}
                                #{data.ranks} | GPT-3로 생성됨
                            </span>
                        </div>
                        <div className="py-4 space-y-4 border-b">
                            <div className="font-bold text-xl">
                                {data.subtitle}
                            </div>

                            <div className="text-[17px]">{data.content}</div>
                        </div>
                        <div className="space-y-3 py-3">
                            <span className="text-xl font-bold ml-2">
                                관련 기사
                            </span>
                            <div className="space-y-3">
                                {data.articles.map((article) => (
                                    <div
                                        onClick={() =>
                                            handleOpenNewTab(article.url)
                                        }
                                        className="border border-black flex flex-col py-1 px-2"
                                    >
                                        <span className="text-sm font-bold">
                                            뉴스
                                        </span>
                                        <span className="text-[15px]">
                                            {article.title}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <span className="loading loading-spinner loading-lg text-primaryBgColor"></span>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default BriefingCardDetail;
