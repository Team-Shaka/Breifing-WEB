import React from 'react';
import { PiCopyrightBold } from "react-icons/pi";
import { Link } from "react-router-dom"
import { FaRegCopyright } from "react-icons/fa6";




const Footer = () => {
    return (
        <div className='flex justify-between bg-whtie p-3  text-primaryBgColor text-base md:text-[18px]'>
            <div className='flex items-center space-x-1'>
                <PiCopyrightBold color='white' />
                <span className='flex items-center '>
                    <FaRegCopyright className='mr-2' />
                    2024 TEAM Shaka - Briefing
                </span>
            </div>
            <div className='md:space-x-5 space-x-10'>
                <Link to="https://www.instagram.com/briefing_today/">Instagram</Link>
            </div>
        </div>
    );
};

export default Footer;