import React from 'react';
import { PiCopyrightBold } from "react-icons/pi";
import { Link } from "react-router-dom"



const Footer = () => {
    return (
        <div className='flex justify-between bg-primaryBgColor p-3 lg:px-20 text-white text-base md:text-[18px]'>
            <div className='flex items-center space-x-1'>
                <PiCopyrightBold color='white' />
                <span>
                    2023 TEAM Shaka - Briefing
                </span>
            </div>
            <div className='md:space-x-5 space-x-10'>
                <span>X</span>
                <Link to="https://www.instagram.com/briefing_today/">Instagram</Link>
            </div>
        </div>
    );
};

export default Footer;