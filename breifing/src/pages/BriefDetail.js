import React from "react";
import { Link } from "react-router-dom";

const BriefDetail = () => {
  const data = {
    id: 1,
    ranks: 1,
    title: "오염수 방류",
    subtitle: "일본 후쿠시마 원전 오염수 방류 문제 지속",
    content:
      "한국은 후쿠시마 제1원전의 오염수 방류 상황을 확인하기 위해 일본 현지로 전문가 3명을 파견했다. 이를 위해 한국 정부는 IAEA와 합의하여 2주에 한 번 전문가를 파견하고, 최신 정보를 공유하기 위한 한국-IAEA 정보공유 메커니즘을 수립했다. 전문가의 체류 기간 및 활동 계획은 IAEA와의 협의에 따라 결정될 예정이다. 이전에도 한국은 오염수 처리 과정을 점검하기 위해 전문가를 파견한 적이 있다. 한국 정부는 실시간으로 상황을 설명하지 않고, 활동이 끝난 뒤 결과를 설명할 것이라고 밝혔다.",
    date: "2023-08-27",
    articles: [
      {
        id: 1,
        press: "노컷뉴스",
        title:
          "'일본은 없다' 전여옥, 日오염수 비판 김윤아에 \"청산규리\" 맹비난 - 노컷뉴스",
        url: "https://news.google.com/rss/articles/CBMiKGh0dHBzOi8vd3d3Lm5vY3V0bmV3cy5jby5rci9uZXdzLzYwMDEyNDHSAQA?oc=5",
      },
      {
        id: 2,
        press: "한국어 방송 - VOA Korean",
        title:
          '일 환경성 "후쿠시마 오염처리수 방류 후 인근 바닷물에서 삼중수소 안나와" - 한국어 방송 - VOA Korean',
        url: "https://news.google.com/rss/articles/CBMiJ2h0dHBzOi8vd3d3LnZvYWtvcmVhLmNvbS9hLzcyNDMwNTUuaHRtbNIBKWh0dHBzOi8vd3d3LnZvYWtvcmVhLmNvbS9hbXAvNzI0MzA1NS5odG1s?oc=5",
      },
    ],
  };
  return (
    <div className="h-screen flex flex-col justify-start items-center bg-primaryBgColor ">
      <div className="  md:w-[768px]  bg-white rounded-lg px-4 pt-2 pb-4 text-primaryTextColor">
        <div className="text-right text-sm text-[#93A8D0]">
          {data.date} Briefing #{data.ranks}
        </div>
        <div className="font-bold">
          <div className="text-4xl">{data.title}</div>
          <div className="mt-3 mb-4 ">{data.subtitle}</div>
          <div className="text-base">{data.content}</div>
        </div>

        <div className=" mt-5">
          <span className="text-base font-bold">관련 기사</span>
          <div className="space-y-4">
            {data.articles.map((article, i) => (
              <Link
                to={article.url}
                key={i}
                className="border-primaryTextColor border-[1px] rounded-lg p-3 flex justify-between"
              >
                <div className="">
                  <span className="text-sm font-bold">뉴스</span>
                  <div className="font-normal text-base">{article.title}</div>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center md:w-[768px] text-[20px] font-bold">
        <div className="bg-white rounded-lg text-primaryBgColor px-2 py-1">
          목록으로
        </div>
        <div className="flex space-x-2">
          <div className="rounded-lg px-2 py-1 bg-[#FF5F5F] text-white">
            브리핑 삭제
          </div>
          <div className="rounded-lg px-2 py-1 bg-[#FF5F5F] text-white">
            본문 재생성
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefDetail;
