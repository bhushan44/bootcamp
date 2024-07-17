import React from "react";
import Header from "../Components/Header";
import first from "../images/first.jpeg";
import "./overview.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { use } from "express/lib/application";
import { useState } from "react";
import Map from "../Components/Map";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {loadStripe} from "@stripe/stripe-js"
import Reviews from "../Components/Reviews";
import CreatingBooking from "../Components/creatingBooking";
import { SlCalender } from "react-icons/sl";
import { MdTrendingUp } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { MdPeopleOutline } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
// import { IoTimeOutline } from "react-icons/io5";
// import { Marker,Popup } from 'leaflet'

export default function TourOverView() {
  // let a,b

  const params = useParams();
  const id = params.id;
  const [data, setData] = useState();
  // let locations
  const [locations, setlocations] = useState([]);

  

  // const center=locations[0]?.coordinates?.[0]
  // let a=center?center[0]:"321"
  // let b=center[1]||"33"

  useEffect(
    function () {
      async function request() {
        const res = await fetch(`https://bootcamp-wine.vercel.app/api/v1/tours/${id}`);
        // console.log(await res.json())
        const result = await res.json();
        console.log(result.data.duration,"dur");
        setData(result.data);
        console.log(result.data.startLocation)
        // setCoordinates(result.data.locations)
        //  locations=data.locations
        setlocations(result.data.locations);
        // console.log(locations,"loc")
        // setlat(result.data.locations[0].coordinates[0]);
        // setlong(result.data.locations[0].coordinates[1]);
        // console.log(result.data.locations[0].coordinates, "cen");
        // console.log(result.data.locations, "loca");
        //  a=result.data.locations[0].coordinates[0]
        //  b=result.data.locations[0].coordinates[1]
      }
      request();
    },
    [id]
  );

  // console.log(params);
  // async function createbooking(){
  //   const price=data.price
  //   console.log(data.price,"price",id)
  //   const senddata={price:data.price}
  //   const res=await fetch("http://localhost:5000/api/v1/createbooking",{
  //     method:"POST",
  //     body:JSON.stringify({"price":data.price,"tour":id}),
  //     headers:{Authorization:`Bearer ${localStorage.getItem("token")}`,
  //   "content-Type":"application/json"}
  //   })
  //   const result=await res.json()
  //   console.log(result)

  // }
  const makePayment = async()=>{
    const stripe = await loadStripe("pk_test_51PbcTDSIZbr9gJylUss4tysJXduwbpiIEwx8KPzJHs7KlzYoOeCvqrqVF7zEzIrknajengi2ZzwZ2Id3xgioUtIZ00y2zMXb1O");

    
    const headers = {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${sessionStorage.getItem("token")}`
    }
    const response = await fetch(`https://bootcamp-wine.vercel.app/api/v1/bookings/checkout-session/${params.id}`,{
        method:"GET",
        headers:headers,
        // body:JSON.stringify(body)
    });

    const session = await response.json();
    console.log(session)
    const result = stripe.redirectToCheckout({
        sessionId:session.session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}

  return (
    <div>
      <header>
        <Header></Header>
      </header>

      <main className="main">
        {data && (
          <>
            {" "}
            <div className=" overview-image flex justify-center items-center relative">
              {/* <div></div> */}
              <img
                src={`https://bootcamp-wine.vercel.app/images/tours/${data.imageCover}`}
                alt="bhushan"
                className="w-full h-[600px] z-10 absolute "
              ></img>
              <div className=" bg-green-300 h-[800px] w-full   absolute z-[99]   flex justify-center items-center opacity-45 ">
              
              </div>
              <div  className="z-[100] absolute flex gap-16 flex-col items-center justify-center"><p className="rounded-lg bg-green-800 text-4xl  p-5 text-white ">{data.name}</p>
             <div className="flex gap-10 text-3xl text-white"><p className="flex gap-5 "><IoTimeOutline style={{height:"50px",width:"50px", color:"white"}}></IoTimeOutline>{data.duration} days</p>
            <p className="flex gap-4"><CiLocationOn style={{height:"50px",width:"50px", color:"white"}}></CiLocationOn> {data.startLocation.description} </p> <span></span></div> </div> 
            </div>
            <div className="overview-2 ">
              <div className="bg-slate-100 w-[50%] flex gap-5 flex-col justify-center items-center realtive pt-[100px]">
                <div className="  flex-col flex  gap-4 w-[300px] h-[250px] mt-16"><p className="text-2xl text-green-600">Quick facts</p>
                <ul className="flex flex-col gap-4"><li className="flex gap-4" >
                  <SlCalender style={{height:"30px",width:"30px", color:"green"}}></SlCalender><p>{ new Date(data.startDates[0]).t}</p></li>
                  <li className="flex gap-5"><MdTrendingUp style={{height:"30px",width:"30px", color:"green"}}></MdTrendingUp><p>{data.difficulty}</p></li>
                  <li className="flex gap-4"><MdPeopleOutline style={{height:"30px",width:"30px", color:"green"}}></MdPeopleOutline><p>{data.maxGroupSize}</p></li>
                  <li className="flex gap-4"><CiStar style={{height:"30px",width:"30px", color:"green"}} ></CiStar ><p>{data.rating}</p></li></ul></div>
                  <div className="flex   h-[300px] w-[300px] flex-col gap-4">
                    <p className="text-2xl text-green-500">Tour Guides</p>


                    <div className="flex flex-col gap-8">
                    {
                      data.guides.map((el)=>(
                        (el.role==="lead-giude" || "giude")&&
                          <div className="flex  gap-5 items-center "> <img src="https://tse1.mm.bing.net/th?id=OIP.4uBD0tePaYuijlvJujdSDAHaEo&pid=Api&P=0&h=180" 
                          alt="bhu" className="w-[50px] h-[50px] rounded-[50%]"></img><h1>{el.role}</h1><h1 
                          className="">{el.name}</h1></div>
                        
                      ))
                    }
                    </div>
                

                  </div>

                
              </div>
              <div className="bg-white w-[50%] flex flex-col gap-10 items-center justify-center">
                <p className="text-2xl text-green-400"s>{data.name}</p>
                <p>{data.description}</p>
              </div>
            </div>
            <div className="overview-3">
              <img
                src={`https://bootcamp-wine.vercel.app/images/tours/${data.images[0]}`}
                alt="bhushan "
                className="w-[33%] h-full"
              ></img>
              {/* <img src={`http://localhost:4000/images/tours/${data.images[0]}`} alt="bhushan "className="w-[33%]"></img> */}
              <img
                src={`https://bootcamp-wine.vercel.app/images/tours/${data.images[1]}`}
                alt="bhus"
                className="w-[33%]"
              ></img>
              <img
                src={`https://bootcamp-wine.vercel.app/images/tours/${data.images[2]}`}
                alt="bhushan"
                className="w-[33%]"
              ></img>
              lcvvm,vcm,vdf,v
            </div>
            <div className="overview-4">
              <Map locations={locations} startLocation={data.startLocation.coordinates}></Map>
            </div>
            <div className="overview-5">
              <Reviews id={id}></Reviews>
            </div>
            <div className="overview-6">
              <CreatingBooking makePayment={makePayment } duration={data.duration} images={data.images}></CreatingBooking>
              {/* <button onClick={makePayment}>createbooking</button> */}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
