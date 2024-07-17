import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CreatingBooking({makePayment,images,duration}) {
  const navigation=useNavigate()
  return (
    <div className='flex items-center justify-center h-[300px] w-[900px] gap-20 bg-white relative'>
        <div> 
            <img src={`https://bootcamp-wine.vercel.app/images/tours/${images[0]}`} alt='bhu'  className='w-[150px] h-[150px] rounded-[50%] left-10 top-16 absolute'></img>
            <img src={`https://bootcamp-wine.vercel.app/images/tours/${images[1]}`} alt='bhu'  className='w-[150px] h-[150px] rounded-[50%] left-16  top-16 absolute'></img>
              <img src={`https://bootcamp-wine.vercel.app/images/tours/${images[2]}`} alt='bhu'  className='w-[150px] h-[150px] rounded-[50%] left-24 top-16  absolute'></img>

        </div>
        <div className='relative left-24'><p className='text-2xl text-green-500'>what are you waiting for?</p><p>{duration}days adventure.infinite memories.</p></div>
         {sessionStorage.getItem("token")? <button onClick={makePayment} className=' relative left-32 border-solid bg-green-400 p-2 border-black rounded-md'>book  tour now</button>
         : <button className=' relative left-32 border-solid bg-green-400 p-2 border-black rounded-md' onClick={()=>{navigation("/login")}}>login to book your tour</button>}
    </div>
  )
}
