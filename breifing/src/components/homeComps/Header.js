import React from 'react';
import { MdArrowOutward } from "react-icons/md";
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className='bg-white p-3 lg:py-3 lg:px-20 flex items-center justify-between text-base md:text-[18px]'>
            <Link to="/" className='text-lg font-extrabold text-primaryBgColor'>
                Briefing
            </Link>
            <div className='flex items-center space-x-5'>
                <div className='cursor-pointer'>Home</div>
                <div className='cursor-pointer'>About Team</div>
                <Link to="https://linktr.ee/briefingnews" className=' btn  btn-outline min-h-fit h-7 px-2 rounded-none  gap-0 bg-white font-normal border border-black'>
                    <span>
                        Install
                    </span>
                    <MdArrowOutward />
                </Link>
            </div>
        </div>
    );
};

export default Header;