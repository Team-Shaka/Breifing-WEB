import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../recoil/atoms/categoryState';
import { cls } from './Header';

const texts = ["전체", "사회", "글로벌", "경제", "과학"]
const SelectBar = () => {
    const [category, setCategory] = useRecoilState(categoryState)

    const onClickBtn = (text) => {
        setCategory(text)

    }

    return (
        <div className='xs:border-t xs:border-b border-[#B6B6B6] p-3'>
            <div className='flex justify-center space-x-5 xs:space-x-20 text-sm'>
                {texts.map((text, i) => <div onClick={() => onClickBtn(text)} className={cls('cursor-pointer hover:font-bold transition-all', category === text ? "font-bold" : "")} key={i}>{text}</div>)}
            </div>

        </div>
    );
};

export default SelectBar;