import React from 'react';

const BriefingCard = ({ ranks, title, subtitle }) => {
    return (
        <div className='bg-white rounded-lg shadow-xl p-3 m-3 px-5 space-y-2 w-64'>
            <div className='text-lg space-x-2 font-bold'>
                <span className='text-[#93A8D0]'>{ranks}.</span>
                <span>{title}</span>
            </div>
            <div className='pl-7 text-base'>
                {subtitle}
            </div>
        </div>
    );
};

export default BriefingCard;