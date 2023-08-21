import React, { useEffect, useState } from "react";
import axios from "axios";
import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import { ReactComponent as Close } from "../assets/images/close.svg";

// 모달 컴포넌트
const Modal = ({ selectedChatting, onClose }) => {
    return (
        <dialog id="my_modal_3" className="modal" open>
            <form
                method="dialog"
                className="modal-box h-2/3 px-0 bg-secondBgColor overflow-y-hidden"
            >
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                >
                    <Close className="w-5 h-5" />
                </button>
                {/* Insert the code here */}
                <div className="mt-4 h-full flex flex-col">
                    <div className="flex-grow py-4 overflow-y-auto">
                        {selectedChatting.messages.map((message) => (
                            <div key={message.id}>
                                {message.role === "Bot" ? (
                                    <BotMessage
                                        content={message.content}
                                        time={message.created_at}
                                    />
                                ) : (
                                    <UserMessage
                                        content={message.content}
                                        time={message.created_at}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </dialog>
    );
};

const Storage = () => {
    const [chattings, setChattings] = useState([]);
    const [groupedChattings, setGroupedChattings] = useState({}); // 그룹화된 데이터 상태 추가
    const [selectedChatting, setSelectedChatting] = useState([]);

    // 채팅 리스트 데이터 가져오기
    useEffect(() => {
        axios
            .get(
                "https://7ab7c6c1-9228-4cb2-b19c-774d9cd8b73d.mock.pstmn.io/chattings?ids=12%2C18%2C31%2C104"
            )
            .then((response) => {
                setChattings(response.data.chattings);

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

    // 클릭한 채팅의 정보 가져오기
    const handleChattingClick = async (chattingId) => {
        try {
            const response = await axios.get(
                `https://7ab7c6c1-9228-4cb2-b19c-774d9cd8b73d.mock.pstmn.io/chattings/${chattingId}`
            );
            setSelectedChatting(response.data.messages);
            console.log(selectedChatting);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

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
            <dialog id="my_modal_3" className="modal">
                <form
                    method="dialog"
                    className="modal-box h-2/3 px-0 bg-secondBgColor overflow-y-hidden"
                >
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        <Close className="w-5 h-5" />
                    </button>
                    <div className="mt-4 h-full flex flex-col">
                        <div className="flex-grow py-4 overflow-y-auto">
                            {selectedChatting.map((message) => (
                                <div key={message.id}>
                                    {message.role === "Bot" ? (
                                        <BotMessage
                                            content={message.content}
                                            time={message.created_at}
                                        />
                                    ) : (
                                        <UserMessage
                                            content={message.content}
                                            time={message.created_at}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </dialog>
            <div className="flex flex-col">
                {Object.keys(groupedChattings).map((yearMonth) => (
                    <div key={yearMonth} className="month-section mb-7">
                        <div className="text-primaryTextColor text-base mb-2 pl-4">
                            {formatMonthYear(yearMonth)}
                        </div>
                        <ul className="menu bg-white w-full rounded-lg">
                            {groupedChattings[yearMonth].map(
                                (chatting, chatIndex) => (
                                    <div key={chatting.id}>
                                        {" "}
                                        <li
                                            key={chatting.id}
                                            onClick={() => {
                                                handleChattingClick(
                                                    chatting.id
                                                );
                                                window.my_modal_3.showModal();
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <div className="flex py-3">
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
                                    </div>
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
