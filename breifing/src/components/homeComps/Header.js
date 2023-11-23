import React from 'react';
import { MdArrowOutward } from "react-icons/md";


const Header = () => {
    return (
        <div className='bg-white px-3 py-5 md:py-3 md:px-20 flex items-center justify-between text-base md:text-[18px]'>
            <div className='text-lg font-extrabold text-primaryBgColor'>
                Briefing
            </div>
            <div className='flex items-center space-x-5'>
                <div>Home</div>
                <div>About Team</div>
                <div className='flex items-center space-x-1 bg-white px-2 border border-black'>
                    <span>
                        Install
                    </span>
                    <MdArrowOutward />
                </div>
            </div>
        </div>
    );
};

export default Header;