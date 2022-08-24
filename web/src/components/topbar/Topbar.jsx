import React from 'react'
import "./topbar.css"
import { Link } from "react-router-dom"

import { Search, Person, Chat, Notifications } from "@material-ui/icons"

export default function Topbar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className='topBarContainer'>

            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration:"none" }}>
                    <span className="logo">Lamasocial</span>

                </Link>
            </div>


            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className='searchIcon' />
                    <input type="text" placeholder='Search for a friend, post or video' className="searchInput" />
                </div>
            </div>


            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Home page</span>
                    <span className="topbarLink">Timeline</span>
                </div>

                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">
                            1
                        </span>
                    </div>
                </div>

                <img src={PF + "/posts/2.JPG"} alt="" className="topbarImg" />
            </div>
        </div>
    )
}
