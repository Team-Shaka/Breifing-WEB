import React from 'react';
import { MdArrowOutward } from "react-icons/md";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className='fixed left-0 w-screen bg-primaryBgColor flex justify-center z-20'>
            <div className='w-[1000px] px-4  py-3 space-x-4  lg:py-3  flex items-center justify-between text-base md:text-[18px] bg-primaryBgColor'>
                <Link to="/" className='text-lg font-extrabold text-white'>
                    Briefing
                </Link>
                <div className='flex items-center space-x-5 text-white'>
                    <div className='cursor-pointer font-bold'>Home</div>
                    <div className='cursor-pointer'>About Team</div>
                    <Link to="https://linktr.ee/briefingnews" className=' btn hover:bg-white hover:text-primaryBgColor bg-primaryBgColor min-h-fit h-7 px-2 rounded-none  gap-0 text-white font-normal border border-white'>
                        <span>
                            Install
                        </span>
                        <MdArrowOutward />
                    </Link>
                </div>
            </div>
        </div>

    );
};

export default Header;