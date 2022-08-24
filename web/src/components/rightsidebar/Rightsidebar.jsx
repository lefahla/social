import React from 'react'
import "./rightsidebar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"

export default function Rightbar({ users }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER  
    
    const HomeRightBar = () => {
        return (
            <>

                <div className="birthdayContainer">

                    <img src={PF + "/imgs/gift.jpeg"} alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        {"  "} 
                        <b>Hlompho</b> and <b>4 have birthdays </b>
                    </span>
                </div>

                <img src={PF + "/imgs/ad.jpg"} alt="" className="rightbareAd" />

                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u => ( // To use axios to fetch users from DB
                        <Online key={u.id} user={u} />
                    ))}

                </ul>
            </>
        );
    };

    const ProfileRightBar = () => {
        console.log("ProfileRightBar Info : ")
        console.log(users)
        return (
            <>
                <h4 className="rightBarTitle">User Information</h4>
                <div className="rightBarInfo">
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">City:</span>
                        <span className="rightBarInfoValue">{users.city}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">From:</span>
                        <span className="rightBarInfoValue">{users.from}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">Relationship:</span>
                        <span className="rightBarInfoValue">{
                                users.relationship === 1 ? 'Single' :
                                users.relationship === 2 ? 'Married' :
                                users.relationship === 3 ? 'Complicated' : '-'}
                        </span>
                    </div>
                </div>

                <h4 className="rightBarTitle">User Friends</h4>
                <div className="rightBarFollowings">
                    <div className="rightBarFollowing">
                        <img src={PF + "profile-pictures/bonolo.jpeg"} alt="" className="rightBarFollowingImg" />
                        <span className="rightBarFollowingName">John Doe</span>
                    </div>
                    <div className="rightBarFollowing">
                        <img src={PF + "profile-pictures/bonolo.jpeg"} alt="" className="rightBarFollowingImg" />
                        <span className="rightBarFollowingName">John Doe</span>
                    </div>
                   
                </div>
            </>
        );
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">

                {users ? <ProfileRightBar /> : <HomeRightBar />}
            </div>
        </div>
    )
}
