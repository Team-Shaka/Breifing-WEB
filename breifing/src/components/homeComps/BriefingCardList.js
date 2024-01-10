import axios from "axios";
import React, { useEffect, useState } from "react";
import BriefingCard from "./BriefingCard";
import { Link } from "react-router-dom";
import TabBar from "./SelectBar";
import { useRecoilState } from "recoil";
import { categoryState } from "../../recoil/atoms/categoryState";

const BriefingCardList = () => {
    const date = new Date(Date.now());
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [category, setCagetory] = useRecoilState(categoryState)

    const getType = () => {
        setLoading(false)
        if (category === 0) {
            return "SOCIAL"
        } else if (category === 1) {
            return "GLOBAL"
        } else if (category === 2) {
            return "SCIENCE"
        } else {
            return "ECONOMY"
        }
    }

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
            .get(`${process.env.REACT_APP_BASE_URL}/v2/briefings?type=${getType()}`)
            .then((res) => {
                console.log(res);
                const sorted = [...res.data.result.briefings].sort(
                    (a, b) => a.ranks - b.ranks
                );
                setData(sorted);
                setLoading(true);
            })
            .catch((err) => console.log(err));
    }, [category]);
    return (
        <div className="mt-10 bg-white space-y-5 py-12">
            <div>
                <TabBar />
            </div>
            <div className="flex justify-center">

                {loading ? (<div className="grid grid-cols-[300px] sm:grid-cols-[300px_300px_300px] justify-items-center gap-7">
                    {data?.map((card) => (
                        <Link
                            className="w-full h-full "
                            to={`/briefingCard/${window.btoa(card.id)}`}
                        >
                            <BriefingCard
                                ranks={card.ranks}
                                title={card.title}
                                subtitle={card.subtitle}
                            />
                        </Link>
                    ))}
                </div>) : (
                    <span className="loading loading-spinner loading-lg m-10 text-primaryBgColor"></span>
                )}

            </div>

        </div>
    );
};

export default BriefingCardList;
