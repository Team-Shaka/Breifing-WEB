import React from 'react';
import { MdArrowOutward } from "react-icons/md";


const Header = () => {
    return (
        <div className='bg-white p-3 lg:py-3 lg:px-20 flex items-center justify-between text-base md:text-[18px]'>
            <div className='text-lg font-extrabold text-primaryBgColor'>
                Briefing
            </div>
            <div className='flex items-center space-x-5'>
                <div>Home</div>
                <div>About Team</div>
                <div className=' btn  btn-outline min-h-fit h-7 px-2 rounded-none  gap-0 bg-white font-normal border border-black'>
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