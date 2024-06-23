import React, { useEffect, useState, useRef } from "react";
import Header from "../components/aboutComps/Header";
import { SocialBox } from "../components/homeComps/SocialBox";
import { GlobalBox } from "../components/homeComps/GlobalBox";
import { EconomyBox } from "../components/homeComps/EconomyBox";
import { ScienceBox } from "../components/homeComps/ScienceBox";
import axios from "axios";
import formatDateWithDay from "../utils/formatDateWithDay";

const Home = () => {
  const [news, setNews] = useState([]);
  const [date, setDate] = useState(new Date());
  const [timeOfDay, setTimeOfDay] = useState("Evening");
  const [isLoading, setIsLoading] = useState(false);
  const lastElementRef = useRef(null);

  useEffect(() => {
    fetchNews(date, timeOfDay);
  }, [date, timeOfDay]);

  // Setup IntersectionObserver to handle infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMoreNews();
        }
      },
      { rootMargin: "100px" }

    );

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
    return () => observer.disconnect();
  }, [isLoading]);

  const loadMoreNews = () => {
    if (isLoading) return;
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

          <SocialBox
            briefingList={newsItem.social}
            date={date.toISOString().split("T")[0]}
            timeOfDay={timeOfDay}
          />
          <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
          <GlobalBox
            briefingList={newsItem.global}
            date={date.toISOString().split("T")[0]}
            timeOfDay={timeOfDay}
          />
          <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
          <EconomyBox
            briefingList={newsItem.economy}
            date={date.toISOString().split("T")[0]}
            timeOfDay={timeOfDay}
          />
          <div className="bg-black h-[1px] my-4 mx-auto px-2 w-[calc(100%-1rem)] xl:w-[1170px]"></div>
          <ScienceBox
            briefingList={newsItem.science}
            date={date.toISOString().split("T")[0]}
            timeOfDay={timeOfDay}
          />
        </React.Fragment>
      ))}
      {isLoading && <div>Loading...</div>}
      <div ref={lastElementRef} />
    </div>
  );
};

export default Home;
