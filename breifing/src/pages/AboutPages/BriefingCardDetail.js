import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/aboutComps/Header";
import Footer from "../../components/aboutComps/Footer";
import axios from "axios";
import { Helmet } from "react-helmet";
import { formatDate } from "../../utils/dateFormatter";

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
];


const BriefingCardDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const handleOpenNewTab = (url) => {
    window.open(url);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v2/briefings/${id}`)
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
    <div className=" h-screen flex flex-col bg-white">
      {renderHelmet()}
      <Header />
      <div className="flex-1 flex justify-center">
        <div className="mx-auto w-[calc(100%-1rem)] xl:w-[1200px] p-2">
          {loading ? (
            <div className="">
              <div className="flex flex-col border-b space-y-2 pb-2">
                <div className="flex">
                  <div className="px-[10px] py-[3px] rounded-full text-[14px] text-[#0072E7] bg-[#0072E7] bg-opacity-10">
                    {category.map((c) =>
                      c.eng === data.type ? `${c.kor} ` : ""
                    )}
                    {data.ranks}
                  </div>
                </div>

                <span className="font-semibold text-[26px]">{data.title}</span>
                <span className="text-[#7C7C7C] text-[14px] font-normal">
                  {formatDate(data.date)}{" "}
                  {data.timeOfDay === "Morning" ? "아침" : "저녁"} | GPT-3로
                  생성됨
                </span>
              </div>
              <div className="py-4 space-y-4">
                <div className="font-semibold text-xl leading-7">
                  {data.subtitle}
                </div>

                <div className="text-[16px] leading-7">{data.content}</div>
              </div>
              <div className="space-y-3 py-3">
                <div className="border-b pb-2">
                  <span className="text-xl font-bold">관련 기사</span>
                </div>

                <div className="space-y-3">
                  {data.articles.map((article) => (
                    <div
                      onClick={() => handleOpenNewTab(article.url)}
                      key={article.id}
                      className="border-b flex flex-col py-2 space-y-2 "
                    >
                      <span className="text-[16px]">{article.title.split("-")[0]}</span>
                      <span className="text-[14px]">{article.press}</span>
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
      </div>

      <Footer />
    </div>
  );
};

export default BriefingCardDetail;
