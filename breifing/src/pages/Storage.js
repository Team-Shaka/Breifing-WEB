import React from "react";
import BotMessage from "../components/BotMessage";

const Storage = () => {
    const originalTimeString = "2023/08/21T13:00:00";
    const content = `Breif는 어제의 이슈에 대해서 뉴스 등의 기사를 통해
                        정보를 제공합니다. 해당 내용은 100% 신뢰할 수 없는
                        내용일 수 있으며, 높은 신뢰도를 위해서는 추천 기사 등을
                        통해 정보를 확인하시기 바랍니다. 어떤 것이 궁금하신가요?`;

    return (
        <div className=" bg-secondBgColor w-full h-screen">
            <BotMessage content={content} time={originalTimeString} />
        </div>
    );
};

export default Storage;
