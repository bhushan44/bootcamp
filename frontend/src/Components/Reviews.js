import React, { useState, useEffect } from 'react';
import { IoMdStarOutline } from "react-icons/io";

const times = Array.from({ length: 5 });

export default function Reviews({ id }) {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const result = await fetch(`https://bootcamp-wine.vercel.app/api/v1/reviews/${id}`);
      const res = await result.json();
      setReviewData(res.data);
      console.log(res,"re");
    }
    getReviews();
  }, [id]);

  return (
    <div className='overflow-x-auto h-[500px] p-5 scrollbar-thin scrollbar-thumb-scrollbar scrollbar-track-scrollbarTrack gap-8 flex'>
      {
        reviewData?.map((el, index) => (
          <div 
            key={index} 
            className='mt-[100px] bg-white flex-shrink-0 flex flex-col items-center p-5 snap-start' 
            style={{ width: '300px', minWidth: '300px', height: '300px' }}
          >
            <div className='flex justify-between items-center w-full mb-4'>
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.4uBD0tePaYuijlvJujdSDAHaEo&pid=Api&P=0&h=180"
                className='rounded-full w-[100px] h-[100px]'
                alt="user"
              />
              <p>{el.user?.name}</p>
            </div>
            <div className='mb-4'>{el?.review}</div>
            <div className='flex'>
              {times.map((_, i) => (
                <IoMdStarOutline
                  key={i}
                  className={i < el?.rating ? "text-green-500" : "text-red-500"}
                />
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}
