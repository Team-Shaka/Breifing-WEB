import React from 'react';
import { PiCopyrightBold } from "react-icons/pi";


const Footer = () => {
    return (
        <div className='flex justify-between bg-primaryBgColor md:px-20 p-3 text-white text-[10px] md:text-[17px]'>
            <div className='flex items-center space-x-1'>
                <PiCopyrightBold color='white' />
                <span>
                    2023 TEAM Shaka - Briefing
                </span>
            </div>
            <div className='md:space-x-5 space-x-10'>
                <span>X</span>
                <span>Instagram</span>
            </div>
        </div>
    );
};

export default Footer;