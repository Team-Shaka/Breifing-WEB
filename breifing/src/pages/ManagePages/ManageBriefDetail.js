import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../components/chatComs/loading.css";
import ManagingHeader from "../../components/chatComs/ManagingHeader";
import { TbPencil } from "react-icons/tb";
import tw from "tailwind-styled-components"
import { useForm } from "react-hook-form";

const Inform = tw.span`
 px-2 border-[#7C7C7C] border-r
`

const types = [
  { eng: "SOCIAL", ko: "사회" },
  { eng: "GLOBAL", ko: "글로벌" },
  { eng: "ECONOMY", ko: "경제" },
  { eng: "SCIENCE", ko: "과학" },
]
const ManageBriefDetail = () => {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [modifyState, setModifyState] = useState([{
    item: "title", id: 0, state: false
  },
  {
    item: "subTitle", id: 1, state: false
  },
  {
    item: "content", id: 2, state: false
  }])
  const [change, setChange] = useState(false)

  const onClickModify = (id) => {
    setModifyState(prev => {
      const newState = prev.map(p => ({
        ...p, state: p.id === id ? !p.state : p.state
      }))
      return newState
    })
  }

  const onValid = (data) => {
    console.log(data)
    axios.patch(`${process.env.REACT_APP_BASE_URL}/briefings/${id}`, {
      title: data.title,
      subTitle: data.subTitle,
      content: data.content
    }).then(res => {
      console.log(res)
      setChange(prev => !prev)
    }).catch(err => console.log(err))
  }
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v2/briefings/${id}`)
      .then((res) => {
        console.log(res);
        setLoading(true)
        setData(res.data.result);
        setModifyState(prev => {
          const newState = prev.map(p => ({
            ...p, state: false
          }))
          return newState
        })
      })
      .catch((err) => console.log(err));
  }, [change]);
  return (
    <div className="h-screen flex flex-col justify-start items-center bg-white text-black">
      <ManagingHeader showDatepicker={false} />
      {loading ?
        <form onSubmit={handleSubmit(onValid)} className="mx-5 sm:w-[768px] bg-white rounded-lg px-4 py-10 ">
          <div className="space-y-2">
            <div className="text-4xl flex items-center space-x-3">
              <TbPencil onClick={() => onClickModify(0)} />
              {modifyState.find(m => m.id === 0).state ?
                <input autoFocus {...register("title", { value: data?.title })} className="" />
                : <div className="font-bold">{data?.title}</div>}


            </div>
            <div className="text-sm text-[#7C7C7C] pb-3 border-b">
              <Inform className="pl-0">
                {data?.date}
              </Inform>
              <Inform>
                {types.find(type => type.eng === data?.type)?.ko} #{data?.ranks}
              </Inform>
              <Inform>
                GPT-3로 생성됨
              </Inform>
              <Inform className="border-r-0">
                {data?.id}
              </Inform>

            </div>
          </div>

          <div className="border-b grid grid-cols-[50px_repeat(1,minmax(0,1fr))] py-3 ">
            <TbPencil onClick={() => onClickModify(1)} className="text-4xl" />
            {modifyState.find(m => m.id === 1).state ?
              <input autoFocus {...register("subTitle", { value: data?.subtitle })} className="pt-1" />
              : <div className="mt-2 font-bold">{data?.subtitle}</div>
            }

            <TbPencil onClick={() => onClickModify(2)} className="text-4xl" />
            {modifyState.find(m => m.id === 2).state ?
              <textarea autoFocus {...register("content", { value: data?.content })} className="h-80 text-base leading-8 " />
              :
              <div className="text-base leading-8  ">
                {data?.content}
              </div>}



          </div>

          <div className=" ">
            <div className="text-base font-bold p-2 py-4 text-[20px] ">관련 기사</div>
            <div className="space-y-4">
              {data?.articles.map((article, i) => (
                <Link
                  to={article.url}
                  key={i}
                  className="border-black border-[1px]  p-3 py-2 flex justify-between items-center "
                >
                  <div className="">
                    <span className="text-sm font-bold">뉴스</span>
                    <div className="font-normal text-base">{article.title}</div>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className=" py-5 text-right ">
            <button className="bg-primaryBgColor text-white font-bold p-4 py-2 btn hover:bg-primaryBgColor rounded-none">수정보내기</button>
          </div>
        </form> :
        <div>
          <span className="loading loading-spinner loading-lg text-primaryBgColor mt-40"></span>
        </div>
      }


    </div >
  );
};

export default ManageBriefDetail;
