import React, { useState } from 'react'
import "./MyAccount.scss"
import { Link } from 'react-router-dom';
const MyAccount = () => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    
    return (
        <div className='myaccount'>
            <h1>My Account</h1>
            <div className="container">
                <div className="left">
                    <img src="../../../public/img/noavatar.jpg" alt="" />
                    <Link to="/update">
                        <button className='btn'>Edit Profile</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Full Name:</h1>
                    <p>{currentUser.username}</p>
                    <h1>Email:</h1> 
                    <p>{currentUser.email}</p>
                    <h1>Joined On:</h1>
                    <p>{String(currentUser.createdAt).substring(0,10)}</p>

                    <div className="change">
                        <button className='butn'>Change Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyAccount