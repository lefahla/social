import React, { useState, useEffect } from 'react'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import RightSideBar from '../../components/rightsidebar/Rightsidebar'
import LeftSidebar from '../../components/leftsidebar/Leftidebar'
import "./profile.css"
import axios from 'axios'
import { useParams} from "react-router-dom"; 

export default function Profile({ post }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [users, setUser] = useState({})

  const username = useParams()

  console.log("Thabo")
  console.log(username)
  

  useEffect(() => {
    const fetchUser = async () => { 
      try {
        const users = await axios.get(`/users?username=John`)

        setUser(users.data)
        console.log("Profile data : ");
        console.log(users)

      } catch (err) {
        console.log("Profile posts [ " + err + " ]")
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Topbar />

      <div className="profile">
        <LeftSidebar />  
        <div className="profileRight">

          <div className="profileRightTop">
            <div className="profileCover">
              <img className='profileCoverImg' src={users.coverPhoto || PF + "/imgs/coverImg.jpeg"} alt="" />
              <img className='profileUserImg' src={users.profilePicture || PF + "/imgs/no-profile-picture.jpg"} alt="" />

            </div>

            <div className="profileInfo">
              <h4 className="profileInfoName">{users.username}</h4>
              <span className="profileInfoDesc">{users.desc}</span>
            </div>
          </div>

          <div className="profileRightBottom">
            <Feed username="John" />
            <RightSideBar user={users} />
          </div>
        </div>
      </div>

    </>
  )
} 