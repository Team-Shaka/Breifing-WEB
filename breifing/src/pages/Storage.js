import React, { useEffect, useState } from "react";
import axios from "axios";
import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import { ReactComponent as Close } from "../assets/images/close.svg";
import attention from "../assets/images/attention.png";

const Storage = () => {
    const [chattings, setChattings] = useState([]);
    const [groupedChattings, setGroupedChattings] = useState({}); // 그룹화된 데이터 상태 추가
    const [selectedChatting, setSelectedChatting] = useState([]);
    const [localStorageChatIds, setLocalStorageChatIds] = useState(""); // 로컬스토리지에 저장된 채팅 아이디들 문자열

    // 로컬스토리지에 저장된 채팅 아이디들 가져오기
    useEffect(() => {
        const localChatids = localStorage.getItem("chatIds");
        // ex : chatIds = "12,18,31,104"
        setLocalStorageChatIds(localChatids);
    }, []);

    // 채팅 리스트 데이터 가져오기
    useEffect(() => {
        if (!localStorageChatIds) return;
        axios
            .get(
                `${process.env.REACT_APP_BASE_URL}/chattings?ids=${localStorageChatIds}`
            )
            .then((response) => {
                setChattings(response.data.chattings);

                // console.log(localStorageChatIds);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [localStorageChatIds]);

    // 새로운 chattings 데이터가 업데이트될 때마다 그룹화 수행
    useEffect(() => {
        const updatedGroupedChattings = {};

        chattings.forEach((chatting) => {
            const datePart = chatting.created_at.split("T")[0];
            const [year, month, day] = datePart.split("-");

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
                `${process.env.REACT_APP_BASE_URL}/chattings/${chattingId}`
            );
            setSelectedChatting(response.data.messages);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // YY.MM.DD 로 포맷팅
    function formatDate(timeString) {
        const datePart = timeString.split("T")[0];
        const [year, month, day] = datePart.split("-");
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

    return (
        <>
            {chattings.length === 0 ? (
                <div className="flex flex-col h-screen justify-center items-center overflow-y-hidden">
                    <img
                        className="w-16 h-16 mb-10"
                        src={attention}
                        alt="storage"
                    ></img>
                    <div className=" text-base">
                        채팅 스토리지가 비어있어요.
                    </div>
                </div>
            ) : (
                <>
                    <div className=" bg-secondBgColor w-full h-screen overflow-y-scroll p-6">
                        {/* 상세보기 모달창 */}
                        <dialog id="my_modal_3" className="modal">
                            <form
                                method="dialog"
                                className="modal-box h-2/3 px-1 bg-secondBgColor overflow-y-hidden"
                            >
                                <button className="btn btn-sm btn-circle btn-ghost focus:ring-0 focus:outline-none  border-none absolute right-2 top-2">
                                    <Close className="w-5 h-5" />
                                </button>
                                {/* 키워드 헤더 */}
                                <h3 className="text-lg text-primaryTextColor ml-4">
                                    #{selectedChatting.briefingKeyword}
                                </h3>
                                <div className="mt-4 h-full flex flex-col">
                                    <div className="flex-grow py-4 overflow-y-auto">
                                        {selectedChatting.map((message) => (
                                            <div key={message.id}>
                                                {message.role ===
                                                "assistant" ? (
                                                    <BotMessage
                                                        content={
                                                            message.content
                                                        }
                                                        time={
                                                            message.created_at
                                                        }
                                                    />
                                                ) : (
                                                    <UserMessage
                                                        content={
                                                            message.content
                                                        }
                                                        time={
                                                            message.created_at
                                                        }
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </form>
                        </dialog>
                        {/* 채팅 리스트 */}
                        <div className="flex flex-col">
                            {groupedChattings &&
                                Object.keys(groupedChattings).map(
                                    (yearMonth) => (
                                        <div
                                            key={yearMonth}
                                            className="month-section mb-7"
                                        >
                                            <div className="text-primaryTextColor text-base mb-2 pl-4">
                                                {formatMonthYear(yearMonth)}
                                            </div>
                                            <ul className="menu bg-white w-full rounded-lg">
                                                {groupedChattings[yearMonth] &&
                                                    groupedChattings[
                                                        yearMonth
                                                    ].map(
                                                        (
                                                            chatting,
                                                            chatIndex
                                                        ) => (
                                                            <div
                                                                key={
                                                                    chatting.id
                                                                }
                                                            >
                                                                {" "}
                                                                <li
                                                                    key={
                                                                        chatting.id
                                                                    }
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
                                                                            {
                                                                                chatting.title
                                                                            }
                                                                        </div>
                                                                        <div className="ml-auto text-secondTextColor text-sm">
                                                                            {formatDate(
                                                                                chatting.created_at
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                                {groupedChattings[
                                                                    yearMonth
                                                                ].length -
                                                                    1 !==
                                                                    chatIndex && (
                                                                    <hr />
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                            </ul>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Storage;
