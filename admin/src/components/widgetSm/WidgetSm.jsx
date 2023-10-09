import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import axios from "axios"

export default function WidgetSm() {

  const [newUsers, setNewUsers]= useState([])

  useEffect(()=>{
    const getNewUsers = async ()=>{
      try{
        const res = await axios.get("/users?new=true", {headers:{
          token:
            "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
        }
      })
      setNewUsers(res.data)
      }catch(err){
        console.log(err)
      }
    }
    getNewUsers()
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUsers.map(user=>(
        <li className="widgetSmListItem">
          <img
            src={user.profilePic || "data:image/jpeg;base64,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"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}
