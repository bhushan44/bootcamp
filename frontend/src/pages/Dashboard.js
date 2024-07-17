import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import UpdatePassword from '../Components/Updatepassword';
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

export default function Dashboard() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");

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
                console.log(userData)
                setName(userData.data.name);
                setEmail(userData.data.email);
                setPhotoURL(userData.data.photo); // Assuming the backend returns a photo URL
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setSelectedFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        if (photo) {
            formData.append('photo', photo);
        }

        try {
            const response = await fetch('https://bootcamp-wine.vercel.app/api/v1/updateuser', {
                method: 'PATCH',
                body: formData,
                headers: {
                      'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            if (result.photoURL) {
                setPhotoURL(result.photoURL); // Update photo URL if returned from backend
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Header />
            <div className='h-[1000px] flex border-solid border-red-300 m-[100px]'>
                <div className='bg-green-300 w-[30%] h-full pl-10 pt-24 flex  gap-5 flex-col'>
                    <div className='flex gap-4'>
                        <IoSettingsOutline size={35}></IoSettingsOutline><p>settings</p>
                    </div>
                    <div className='flex gap-4'><FaRegCalendarCheck size={35}></FaRegCalendarCheck><p>my bookings</p></div>
                    <div className='flex gap-4'><FaRegStar size={35}></FaRegStar><p>my reviews</p></div>
                </div>
                <div className='w-[70%] h-full flex flex-col'>
                    <form onSubmit={handleSubmit} className='h-[50%] border-b-2 border-black flex flex-col justify-center items-center'>
                        <p className='text-3xl text-green-400'>YOUR ACCOUNT SETTINGS</p>
                        {photoURL && (
                            <div className='mb-4'>
                                <img src={`https://bootcamp-wine.vercel.app/images/users/${photoURL}`} alt="Profile" className='w-32 h-32 rounded-full object-cover' />
                            </div>
                        )}
                        <div className='flex flex-col'>
                            <label>Your Name</label>
                            <input
                                type="text"
                                className='border-solid bg-slate-100 w-[400px]'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label>Your Email</label>
                            <input
                                type="email"
                                className='border-solid bg-slate-100 w-[400px]'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='flex flex-col'>
                            {/* <label>Upload Photo</label> */}
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className='hidden'
                                id='photoInput'
                            />
                            <label htmlFor='photoInput' className='cursor-pointer text-2xl text-green-500 border-b-2'>
                                {"upload new photo"}
                            </label>
                        </div>
                        <button type="submit" className='mt-4 p-2 bg-blue-500 text-white'>
                            Save Settings
                        </button>
                    </form>
                    <div className='h-[50%]'>
                        <UpdatePassword></UpdatePassword>
                    </div>
                </div>
            </div>
        </div>
    );
}
