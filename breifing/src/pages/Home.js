import React, { useEffect, useState, useRef } from "react";
import Header from "../components/aboutComps/Header";
import { SocialBox } from "../components/homeComps/SocialBox";
import { GlobalBox } from "../components/homeComps/GlobalBox";
import { EconomyBox } from "../components/homeComps/EconomyBox";
import { ScienceBox } from "../components/homeComps/ScienceBox";
import axios from "axios";
import formatDateWithDay from "../utils/formatDateWithDay";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { useRecoilValue } from "recoil";
import { categoryState } from "../recoil/atoms/categoryState";
import getCurrentTimeOfDay from "../utils/getCurrentTimeOfDay";

const Home = () => {
  const [news, setNews] = useState([]);
  const [date, setDate] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState(getCurrentTimeOfDay());
  const [isLoading, setIsLoading] = useState(false);
  const lastElementRef = useRef(null);

  const category = useRecoilValue(categoryState);

  useEffect(() => {
    fetchNews(date, timeOfDay);
  }, [date, timeOfDay]);

  const loadMoreNews = () => {
    setIsLoading(true);
    let newDate = new Date(date);
    let newTimeOfDay = timeOfDay === "Evening" ? "Morning" : "Evening";

    if (timeOfDay === "Morning") {
      newDate.setDate(newDate.getDate() - 1);
    }

    setDate(newDate);
    setTimeOfDay(newTimeOfDay);
  };

  const fetchNews = async (currentDate, currentTimeOfDay) => {
    const dateString = currentDate.toISOString().split("T")[0];

    try {
      const responses = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SOCIAL&date=${dateString}&timeOfDay=${currentTimeOfDay}`
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=GLOBAL&date=${dateString}&timeOfDay=${currentTimeOfDay}`
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=ECONOMY&date=${dateString}&timeOfDay=${currentTimeOfDay}`
        ),
        axios.get(
          `${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SCIENCE&date=${dateString}&timeOfDay=${currentTimeOfDay}`
        ),
      ]);

      const newNews = responses.map(
        (response) => response.data.result.briefings
      );
      setNews((prevNews) => [
        ...prevNews,
        {
          date: dateString,
          timeOfDay: currentTimeOfDay,
          social: newNews[0],
          global: newNews[1],
          economy: newNews[2],
          science: newNews[3],
        },
      ]);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useIntersectionObserver(lastElementRef, loadMoreNews, isLoading);

  return (
    <div>
      <Header />
      {news.map((newsItem, index) => (
        <React.Fragment key={index}>
          {newsItem.date && index !== 0 && (
            <div className="my-4 mx-auto flex justify-center sm:justify-start sm:px-16 py-2 text-base text-[#306DAB] w-[calc(100%-1rem)] rounded-lg xl:w-[1170px] bg-[#0072E721]">
              {formatDateWithDay(new Date(newsItem.date))}{" "}
              {newsItem.timeOfDay === "Morning" ? "아침" : "저녁"} 브리핑
            </div>
          )}

          {category === "전체" || category === "사회" ? (
            <React.Fragment>
              <SocialBox
                briefingList={newsItem.social}
                date={date.toISOString().split("T")[0]}
                timeOfDay={timeOfDay}
              />
              <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
            </React.Fragment>
          ) : null}
          {category === "전체" || category === "글로벌" ? (
            <React.Fragment>
              <GlobalBox
                briefingList={newsItem.social}
                date={date.toISOString().split("T")[0]}
                timeOfDay={timeOfDay}
              />
              <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
            </React.Fragment>
          ) : null}

          {category === "전체" || category === "경제" ? (
            <React.Fragment>
              <EconomyBox
                briefingList={newsItem.social}
                date={date.toISOString().split("T")[0]}
                timeOfDay={timeOfDay}
              />
              <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
            </React.Fragment>
          ) : null}

          {category === "전체" || category === "과학" ? (
            <React.Fragment>
              <ScienceBox
                briefingList={newsItem.social}
                date={date.toISOString().split("T")[0]}
                timeOfDay={timeOfDay}
              />
            </React.Fragment>
          ) : null}
        </React.Fragment>
      ))}
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loading loading-spinner loading-lg text-primaryBgColor"></span>
        </div>
      )}
      <div ref={lastElementRef} />
    </div>
  );
};

export default Home;
