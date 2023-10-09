import { useState } from "react";
import "./newUser.css";
import { useContext } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { createUser } from "../../context/userContext/apiCalls";
import storage from "../../firebase";

export default function NewUser() {

  const [user , setUser] = useState(null)
  const [profilePic , setProfilePic] = useState(null)
  const [uploaded , setUploaded] = useState(0)



  const {dispatch}= useContext(UserContext)

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]:value})
  }

  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file;
      const uploadTask = storage.ref(`/item/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setUser((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) =>{
    e.preventDefault()
    upload([
      {file: profilePic, label: "profilePic"},
    ])
  } 

  const handleSumbit =(e)=>{
    e.preventDefault()
    createUser(user,dispatch)
  }


  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="John Smith" name="username"  onClick={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" name="email" onClick={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input type="password" placeholder="password" name="password" onClick={handleChange}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="number" placeholder="+1 123 456 78" name="phoneNumber" onClick={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Profile picture</label>
          <input 
            type="file" 
            id="profilePic" 
            name="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
            />
        </div>
        <div className="newUserItem">
          <label>IsAdmin</label>
          <select className="newUserSelect" name="isAdmin" id="isAdmin"  onClick={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {uploaded === 1 ? (
          <button className="addProductButton" onClick={handleSumbit}>Create</button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        )}
      </form>
    </div>
  );
}
