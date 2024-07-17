import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [data,setData]=useState("")
  const navigation=useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await fetch('https://bootcamp-wine.vercel.app/api/v1/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');

            }

            const userData = await response.json();
            setData(userData.data)
          // Assuming the backend returns a photo URL
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    fetchUserData();
}, []);
  return (
    <div>
      <header className="bg-slate-600 relative  top-0 w-full h-20 flex flex-row text-white">
        <p className="left-7 pt-5 pl-20 text-3xl ">All tours</p>
        <div className=" pt-5 pl-15 flex text-3xl flex-row gap-6 absolute right-20">
          {" "}
      {!sessionStorage.getItem("token")?<>  <button className=" border-2 border-solid rounded-lg p-1">
            Login
          </button>
          <button className=" border-2 border-solid rounded-lg p-1">
            Signup
          </button></>:<>
          <button className=" border-2 border-solid rounded-lg p-1" onClick={()=>{
            sessionStorage.removeItem("token")
            navigation("/")
          }}>
            logout 
          </button>
        <Link to='/dashboard'><img src={`https://bootcamp-wine.vercel.app/images/users/${data?.photo}`} alt="bhu" className="h-[50px] w-[50px] rounded-[50%]"></img></Link>
          <p>{data?.name}</p>
 
          </>}
        </div>
      </header>
    </div>
  );
}
