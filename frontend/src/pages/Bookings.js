import React, { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { IoFlagOutline } from "react-icons/io5";
import { MdOutlineGroup } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import "./Homepage.css";
// import { useNavigate } from "react-router-dom

export default function Bookings() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState(null);

  function details(id) {
    navigate(`/overview/${id}`);
  }

  async function getTours() {
    let result = await fetch("https://bootcamp-wine.vercel.app/api/v1/getbookings", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    setData(result.data);
    console.log(result)
  }

  useEffect(() => {
    getTours();
  }, []);

  return (
    <div className="bg-slate-200">
      <Header></Header>
      <main className="relative flex flex-row flex-wrap justify-center text-slate-500 p-10">
        {data?.map((el) => (
          <div key={el._id} className="bg-white h-auto w-[300px] flex flex-col gap-1 m-10">
            <img
              src={`https://bootcamp-wine.vercel.app/images/tours/${el.tour.imageCover}`}
              alt="Tour"
              className="w-[300px] h-52"
            />
            <div className="flex flex-col p-5">
              <h1 className="text-lg font-bold">
                {el.difficulty} {el.tour.duration} day tour
              </h1>
              <p>{el.tour.summary}</p>
            </div>
            <div>
              <ul className="grid grid-cols-2 p-5">
                <li className="flex">
                  <p>
                    <CiLocationOn
                      style={{
                        width: "30px",
                        height: "30px",
                        color: "green",
                      }}
                    />
                  </p>
                  <span className="inline">mumbai</span>
                </li>
                <li className="flex">
                  <SlCalender
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "green",
                    }}
                  />
                  <span>15 June 2021</span>
                </li>
                <li className="flex">
                  <IoFlagOutline
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "green",
                    }}
                  />
                  <span>stops</span>
                </li>
                <li className="flex">
                  <MdOutlineGroup
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "green",
                    }}
                  />
                  <span>{el.maxGroupSize} people</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-between p-5 bg-slate-50">
              <div>
                <p>Rs.{el.price}</p>
                <p>{el.rating} rating(5)</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-green-400 rounded-lg border-2 border-solid text-white p-2"
                  onClick={() => details(el.tour._id)}
                >
                  Details
                </button>
                <button
                  className="bg-blue-500 rounded-lg border-2 border-solid text-white p-2"
                  onClick={() => navigate(`/createReview/${el.tour._id}/${el.tour.name}`)}
                >
                  Create Review
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* {selectedTourId && <ReviewForm tourId={selectedTourId} onClose={() => setSelectedTourId(null)} />} */}
      </main>
    </div>
  );
}
