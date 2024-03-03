import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/aboutComps/Header";
import Footer from "../../components/aboutComps/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";

const category = [
    {
        eng: "SOCIAL",
        kor: "사회",
    },
    {
        eng: "GLOBAL",
        kor: "글로벌",
    },
    {
        eng: "ECONOMY",
        kor: "경제",
    },
    {
        eng: "SCIENCE",
        kor: "과학",
    },
]
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
                `${process.env.REACT_APP_BASE_URL}/v2/briefings/${id}`
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
            <div className="xl:w-[1200px] flex-1 p-5 flex justify-center">
                {loading ? (
                    <div className="sm:w-[768px]">
                        <div className="flex flex-col border-b space-y-2 pb-2">
                            <div className="flex">
                                <div className="px-2 py-1 rounded-full text-[#0072E7] bg-[#0072E7] bg-opacity-10">
                                    {category.map((c) => c.eng === data.type ? `${c.kor}` : "")}{data.ranks}
                                </div>
                            </div>

                            <span className="font-bold text-3xl">
                                {data.title}
                            </span>
                            <span className="text-[#7C7C7C] text-sm">
                                {data.date} | {" "}{category.map((c) => c.eng === data.type ? `${c.kor}` : "")}
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
