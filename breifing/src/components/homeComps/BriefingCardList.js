import axios from "axios";
import React, { useEffect, useState } from "react";
import BriefingCard from "./BriefingCard";
import { Link } from "react-router-dom";

const BriefingCardList = () => {
    const date = new Date(Date.now());
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    function getFormatDate(date) {
        var year = date.getFullYear(); //yyyy
        var month = 1 + date.getMonth(); //M
        month = month >= 10 ? month : "0" + month; //month 두자리로 저장
        var day = date.getDate(); //d
        day = day >= 10 ? day : "0" + day; //day 두자리로 저장
        return year + "-" + month + "-" + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/v2/briefings?type=SOCIAL`)
            .then((res) => {
                console.log(res, "dfs");
                const sorted = [...res.data.result.briefings].sort(
                    (a, b) => a.ranks - b.ranks
                );
                setData(sorted);
                setLoading(true);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="lg:p-20 bg-white space-y-5 py-12">
            <div className="text-center text-xl xs:text-3xl font-bold">
                오늘의{" "}
                <span className="text-primaryBgColor ">Briefing Keywords</span>{" "}
                <span className="font-normal">- Social</span>
            </div>
            <div className="flex flex-wrap justify-center gap-5 px-6 xs:px-20">
                {loading ? (
                    data?.map((card) => (
                        <Link
                            className="w-full xs:w-72"
                            to={`/briefingCard/${window.btoa(card.id)}`}
                        >
                            <BriefingCard
                                ranks={card.ranks}
                                title={card.title}
                                subtitle={card.subtitle}
                            />
                        </Link>
                    ))
                ) : (
                    <span className="loading loading-spinner loading-lg m-10 text-primaryBgColor"></span>
                )}
            </div>
        </div>
    );
};

export default BriefingCardList;
