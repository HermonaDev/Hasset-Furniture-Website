import React, { useEffect, useState } from 'react'
import "./Update.scss"
import { userRequest } from '../../requestMethods'
const Update = () => {
    const [inputs , setInputs] = useState(null)
    const handleChange = (e)=>{
        const value = e.target.value;
    setInputs({ ...inputs, [e.target.name]:value})
    }
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser)
    console.log(inputs)
    

    const updateProfile = async () => {
        try {
            await userRequest.put(`/users/${currentUser._id}`, inputs);
            console.log("Updated Successfully");
            } catch (error) {
            console.log(error);
            }
        };
    return (
        <div className='update'>
            <div className="container">
                <form className='form'>
                    <div>
                        <label  className='name' htmlFor="name">Name:</label>
                        <input type="text" name='username' className='input' placeholder={currentUser.username} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' className='input' placeholder={currentUser.email} onChange={handleChange}/>
                    </div><br/>
                    <button className='btn' onClick={updateProfile}>Update</button>
                </form>

            </div>
        </div>
    )
}

export default Update
