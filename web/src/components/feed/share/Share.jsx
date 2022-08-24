import React from 'react'
import { PermMedia, Label, EmojiEmotions, Room} from "@material-ui/icons"

import "./share.css"

export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="share">
        <div className="shareTop">
           
            <img className="shareProfileImg" src={PF+"profile-pictures/bonolo.jpeg"} alt="" />
            <input type="text" placeholder="What's in your mind . . ." className="shareInput" />

         </div>     
        
            <hr className="shareHr"/>

        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <span className="shareOptionText">Image or Video</span>
                </div>
                
                <div className="shareOption">
                    <Label htmlColor="Blue" className="shareIcon" />
                    <span className="shareOptionText">Tag</span>
                </div>
                
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                    <span className="shareOptionText">Feelings</span>
                </div>
                
                <div className="shareOption">
                    <Room htmlColor="Green" className="shareIcon" />
                    <span className="shareOptionText">Location</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>

    </div>
    
  )
}
 