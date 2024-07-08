import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../recoil/atoms/categoryState';
import { cls } from './Header';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const texts = ["전체", "사회", "글로벌", "경제", "과학"]
const SelectBar = () => {
    const [category, setCategory] = useRecoilState(categoryState)
    const navigate = useNavigate();
    const { pathname } = useLocation()


    const onClickBtn = (text) => {
        setCategory(text)
        navigate("/")
    }

    return (
        <div className={cls('xs:border-t xs:border-b border-[#B6B6B6] p-3', pathname === "/" ? "" : "hidden xs:block")}>
            <div className='flex whitespace-nowrap justify-center space-x-5 xs:space-x-20 text-sm'>
                {texts.map((text, i) => <div onClick={() => onClickBtn(text)} className={cls('cursor-pointer hover:font-bold transition-all', category === text ? "font-bold" : "")} key={i}>{text}</div>)}
            </div>

        </div>
    );
};

export default SelectBar;