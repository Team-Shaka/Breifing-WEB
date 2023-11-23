import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BriefingCard from './BriefingCard';

const BriefingCardList = () => {
    const date = new Date(Date.now())
    const [data, setData] = useState()

    function getFormatDate(date) {
        var year = date.getFullYear();              //yyyy
        var month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        var day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        return year + '-' + month + '-' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
    }

    useEffect(() => {
        axios.get(`https://dev.newsbreifing.store/briefings/temp?type=KOREA&date=${getFormatDate(date)}`)
            .then(res => {
                console.log(res)
                setData(res.data.result.briefings)

            }).catch(err => console.log(err))
    }, [])
    return (
        <div className='md:p-20 bg-white space-y-5'>
            <div className='text-center text-3xl font-bold'>
                오늘의 <span className='text-primaryBgColor'>Briefing Keywords</span> <span className='font-normal'>- Social</span>
            </div>
            <div className='flex flex-wrap justify-center '>
                {data?.map(card => (
                    <BriefingCard ranks={card.ranks} title={card.title} subtitle={card.subtitle} />
                ))}
            </div>

        </div>
    );
};

export default BriefingCardList;