import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/homeComps/Header';
import Footer from '../components/homeComps/Footer';
import axios from 'axios';

const BriefingCardDetail = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState()


    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/v2/briefings/${window.atob(id)}`)
            .then((res) => {
                console.log(res);
                setData(res.data.result)
                setLoading(true)
            })
            .catch((err) => console.log(err));
    }, [])
    return (
        <div className='h-screen flex flex-col bg-white'>
            <Header />
            <div className='flex-1 p-5 flex justify-center'>
                {loading ?
                    <div className='sm:w-[768px]'>
                        <div className='flex flex-col border-b space-y-2'>
                            <span className='font-bold text-3xl'>{data.title}</span>
                            <span className='text-[#7C7C7C] text-sm'>{data.date} | 사회 #{data.ranks} | GPT-3로 생성됨</span>
                        </div>
                        <div className='py-4 space-y-4 border-b'>
                            <div className='font-bold text-xl'>
                                {data.subtitle}
                            </div>

                            <div className='text-[17px]'>
                                {data.content}
                            </div>

                        </div>
                        <div className='space-y-3 py-3'>
                            <span className='text-xl font-bold ml-2'>관련 기사</span>
                            <div className='space-y-3'>
                                {data.articles.map(article =>
                                    <Link to={article.url} className='border border-black flex flex-col py-1 px-2'>
                                        <span className='text-sm font-bold'>뉴스</span>
                                        <span className='text-[15px]'>{article.title}</span>
                                    </Link>)}
                            </div>
                        </div>
                    </div> :
                    <div className='w-full h-full flex justify-center items-center'>
                        <span className="loading loading-spinner loading-lg text-primaryBgColor"></span>

                    </div>}

            </div>
            <Footer />
        </div>
    );
};

export default BriefingCardDetail;