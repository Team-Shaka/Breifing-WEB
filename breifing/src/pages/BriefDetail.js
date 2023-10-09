import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../components/loading.css";

const BriefDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  const onClickDelete = () => {
    alert("삭제되었습니다.");
  };
  const onClickRe = () => {
    setLoading((prev) => !prev);
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/briefings/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="h-screen flex flex-col justify-start items-center bg-primaryBgColor ">
      <div className="  md:w-[768px]  bg-white rounded-lg px-4 pt-2 pb-4 text-primaryTextColor">
        <div className="text-right text-sm text-[#93A8D0]">
          {data?.date} Briefing #{data?.ranks}
        </div>
        <div className="font-bold">
          <div className="text-4xl">{data?.title}</div>
          <div className="mt-3 mb-4 ">{data?.subtitle}</div>
          <div className="text-base leading-8 flex justify-center items-center h-40">
            {loading ? (
              <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
              </div>
            ) : (
              data?.content
            )}
          </div>
        </div>

        <div className=" mt-5">
          <span className="text-base font-bold">관련 기사</span>
          <div className="space-y-4">
            {data?.articles.map((article, i) => (
              <Link
                to={article.url}
                key={i}
                className="border-primaryTextColor border-[1px] rounded-lg p-3 flex justify-between items-center "
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
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-between items-center md:w-[768px]  font-bold">
        <Link
          to="/managing"
          className="bg-white rounded-lg text-primaryBgColor px-2 py-1"
        >
          목록으로
        </Link>
        <div className="flex space-x-2">
          <div
            className="rounded-lg px-2 py-1 bg-[#FF5F5F] text-white cursor-pointer"
            onClick={onClickDelete}
          >
            브리핑 삭제
          </div>
          <div
            className="rounded-lg px-2 py-1 bg-[#FF5F5F] text-white cursor-pointer"
            onClick={onClickRe}
          >
            본문 재생성
          </div>
        </div>
      </div>
    </div>
  );
};

export default BriefDetail;
