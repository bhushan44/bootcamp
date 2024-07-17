// src/Components/UpdatePassword.js
import React, { useState } from 'react';

export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        // Clear previous errors
        setError("");
        setSuccess("");

        if (newPassword !== confirmPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await fetch('https://bootcamp-wine.vercel.app/api/v1/updatepassword', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                       'Authorization': `Bearer ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify({ currentPassword, newPassword,confirmPassword})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Password updated:', result);
            setSuccess("Password updated successfully.");
        } catch (error) {
            console.error('Error:', error);
            setError("Failed to update password.");
        }
    };

    return (
        <form onSubmit={handleUpdatePassword} className='border-t-2 border-black pt-4 flex flex-col justify-center items-center'>
            <p>UPDATE YOUR PASSWORD</p>
            {error && <p className='text-red-500'>{error}</p>}
            {success && <p className='text-green-500'>{success}</p>}
            <div className='flex flex-col'>
                <label>Current Password</label>
                <input
                    type="password"
                    className='border-solid bg-slate-100 w-[400px]'
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
                <label>New Password</label>
                <input
                    type="password"
                    className='border-solid bg-slate-100 w-[400px]'
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>
            <div className='flex flex-col'>
                <label>Confirm New Password</label>
                <input
                    type="password"
                    className='border-solid bg-slate-100 w-[400px]'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit" className='mt-4 p-2 bg-blue-500 text-white'>
                Save Password
            </button>
        </form>
    );
}
