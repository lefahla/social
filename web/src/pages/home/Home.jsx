import React from 'react'
import Topbar from '../../components/topbar/Topbar'
import Feed from '../../components/feed/Feed'
import RightSideBar from '../../components/rightsidebar/Rightsidebar'
import LeftSidebar from '../../components/leftsidebar/Leftidebar'
import "./home.css"

export default function Home() {
    return (
        <>
            <Topbar />

            <div className="homeContainer">
                <LeftSidebar />
                <Feed />
                <RightSideBar />
            </div>

        </>
    )
} 