import React from 'react';
import { PiCopyrightBold } from "react-icons/pi";


const Footer = () => {
    return (
        <div className='flex justify-between bg-primaryBgColor px-20 py-3 text-white'>
            <div className='flex items-center space-x-1'>
                <PiCopyrightBold color='white' />
                <span>
                    2023 TEAM Shaka - Briefing
                </span>
            </div>
            <div className='space-x-5'>
                <span>X</span>
                <span>Instagram</span>
            </div>
        </div>
    );
};

export default Footer;