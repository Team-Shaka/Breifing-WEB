import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../recoil/atoms/categoryState';

const texts = [
    {
        emoji: "👤",
        text: "사회"
    },
    {
        emoji: "🌐",
        text: "글로벌"
    },
    {
        emoji: "💰",
        text: "경제"
    },
    {
        emoji: "🥼",
        text: "과학"
    }]
const SelectBar = () => {
    const [index, setIndex] = useRecoilState(categoryState)

    const onClickBtn = (i) => {
        setIndex(i)
    }

    return (
        <div className=' sm:flex justify-center'>
            <div className='flex sm:w-[956px] sm:space-x-2'>
                {texts.map((item, i) =>
                    <div onClick={() => onClickBtn(i)} className=' flex flex-col items-center' >
                        <div className='p-3 px-5 btn font-normal bg-white border-none text-[16px] sm:text-[20px]'>
                            {item.emoji} {item.text}
                        </div>

                        <hr className={`transition-transform w-1/2  ${index == i ? "border border-primaryBgColor" : "border-none"}`} />
                    </div>
                )}
            </div>
        </div>

    );
};

export default SelectBar;