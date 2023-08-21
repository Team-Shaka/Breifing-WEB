import React, { useEffect, useState } from "react";
import axios from "axios";
import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";

const Storage = () => {
    const [chattings, setChattings] = useState([]);
    const [groupedChattings, setGroupedChattings] = useState({}); // 그룹화된 데이터 상태 추가

    // 채팅 리스트 데이터 가져오기
    useEffect(() => {
        axios
            .get(
                "https://7ab7c6c1-9228-4cb2-b19c-774d9cd8b73d.mock.pstmn.io/chattings?ids=12%2C18%2C31%2C104"
            )
            .then((response) => {
                setChattings(response.data.chattings);
                // 추가 예시 데이터
                // const exampleChattings = [
                //     {
                //         id: 200,
                //         title: "예시 채팅 1",
                //         created_at: "2023/09/02T09:00:00",
                //     },
                //     {
                //         id: 201,
                //         title: "예시 채팅 2",
                //         created_at: "2023/09/26T15:00:00",
                //     },
                //     {
                //         id: 202,
                //         title: "예시 채팅 3",
                //         created_at: "2023/09/26T15:00:00",
                //     },
                //     {
                //         id: 203,
                //         title: "예시 채팅 4",
                //         created_at: "2023/10/26T15:00:00",
                //     },
                //     {
                //         id: 204,
                //         title: "예시 채팅 5",
                //         created_at: "2023/10/26T15:00:00",
                //     },
                //     {
                //         id: 205,
                //         title: "예시 채팅 6",
                //         created_at: "2023/11/26T15:00:00",
                //     },
                //     {
                //         id: 206,
                //         title: "예시 채팅 7",
                //         created_at: "2023/09/26T15:00:00",
                //     },
                //     {
                //         id: 207,
                //         title: "예시 채팅 8",
                //         created_at: "2023/12/26T15:00:00",
                //     },
                //     {
                //         id: 208,
                //         title: "예시 채팅 9",
                //         created_at: "2024/01/26T15:00:00",
                //     },
                //     {
                //         id: 209,
                //         title: "예시 채팅 10",
                //         created_at: "2024/01/23T15:00:00",
                //     },
                // ];

                // 기존 데이터와 예시 데이터 병합
                // const combinedChattings = [
                //     ...response.data.chattings,
                //     ...exampleChattings,
                // ];
                // 병합된 데이터로 상태 업데이트
                // setChattings(combinedChattings);

                console.log(chattings);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    // 새로운 chattings 데이터가 업데이트될 때마다 그룹화 수행
    useEffect(() => {
        const updatedGroupedChattings = {};

        chattings.forEach((chatting) => {
            const datePart = chatting.created_at.split("T")[0];
            const [year, month, day] = datePart.split("/");

            const yearMonth = `${year}.${month}`;
            if (!updatedGroupedChattings[yearMonth]) {
                updatedGroupedChattings[yearMonth] = [];
            }
            updatedGroupedChattings[yearMonth].push(chatting);
        });

        setGroupedChattings(updatedGroupedChattings);
    }, [chattings]);

    // YY.MM.DD 로 포맷팅
    function formatDate(timeString) {
        const datePart = timeString.split("T")[0];
        const [year, month, day] = datePart.split("/");
        return `${year.slice(-2)}.${month}.${day}`;
    }

    // Month(english), Year 로 포맷팅
    function formatMonthYear(dateString) {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const date = new Date(dateString);
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return `${months[monthIndex]}, ${year}`;
    }

    // Created_at 의 Year, Month 로 그룹화된 데이터 출력
    for (const yearMonth in groupedChattings) {
        console.log(`Year-Month: ${yearMonth}`);
        groupedChattings[yearMonth].forEach((chatting) => {
            console.log(
                `  Title: ${chatting.title}, Created At: ${chatting.created_at}`
            );
        });
        console.log("---");
    }

    // title 글자 수 자르기
    const formatChatTitle = (title) => {
        return title.length > 15 ? `${title.slice(0, 15)}...` : title;
    };

    return (
        <div className=" bg-secondBgColor w-full h-screen overflow-y-scroll p-6">
            <div className="flex flex-col">
                {Object.keys(groupedChattings).map((yearMonth) => (
                    <div key={yearMonth} className="month-section mb-7">
                        <div className="text-primaryTextColor text-base mb-2 pl-4">
                            {formatMonthYear(yearMonth)}
                        </div>
                        <ul className="menu bg-white w-full rounded-lg">
                            {groupedChattings[yearMonth].map(
                                (chatting, chatIndex) => (
                                    <>
                                        {" "}
                                        <li key={chatting.id}>
                                            <div className="flex">
                                                <div className="flex-grow text-base text-primaryTextColor">
                                                    {formatChatTitle(
                                                        chatting.title
                                                    )}
                                                </div>
                                                <div className="ml-auto text-secondTextColor text-sm">
                                                    {formatDate(
                                                        chatting.created_at
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                        {chatIndex !==
                                            groupedChattings[yearMonth].length -
                                                1 && <hr />}
                                    </>
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Storage;
