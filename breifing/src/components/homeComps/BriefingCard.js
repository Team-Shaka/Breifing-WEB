import React from 'react';

const BriefingCard = ({ ranks, title, subtitle }) => {
    return (
        <div className='h-full w-full  sm:border-none transition-all'>
            <div className='bg-white rounded-lg p-3 px-5 space-y-2 h-full'>
                <div className=' text-lg space-x-2 font-bold flex items-center'>
                    <span className='text-[#306DAB] text-2xl xs:text-4xl'>{ranks}.</span>
                    <span className='text-[20px] xs:text-[22px]'>{title}</span>
                </div>
                <div className='pl-5 xs:pl-8 text-[17px] xs:text-[20px] text-[#7C7C7C]'>
                    {subtitle}
                </div>
            </div>
            <hr className='sm:hidden absolute w-[90vw] left-5' />
        </div>
    );
};

export default BriefingCard;