import React from 'react';

const BriefingCard = ({ ranks, title, subtitle }) => {
    return (
        <div className='bg-white rounded-lg shadow-xl p-3 m-3 px-5 space-y-2 h-full'>
            <div className=' text-lg space-x-2 font-bold flex items-center'>
                <span className='text-[#306DAB] text-xl xs:text-4xl'>{ranks}.</span>
                <span className='text-[15px] xs:text-[22px]'>{title}</span>
            </div>
            <div className='pl-5 xs:pl-8 text-sm xs:text-[17px] text-[#7C7C7C]'>
                {subtitle}
            </div>
        </div>
    );
};

export default BriefingCard;