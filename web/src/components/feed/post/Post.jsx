import { useState, useEffect } from 'react'
import "./post.css"
import { MoreVert, Alarm } from "@material-ui/icons"
import { Users } from "../../../dummyData"
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
export default function Post({ post }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({})

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1); 
        setIsLiked(!isLiked);
    } 
 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await axios.get(`/users?userId=${post.userId}`)

                setUser(user.data)
                console.log("Post Data") 
                console.log(user.data)

            } catch (err) {
                console.log("Posts data [ " + err + " ]")
            }
        };

        fetchUser();
    }, [post.userId]);

    return (

        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img className="postProfileImg"
                                src={user.profilePicture || PF + "imgs/no-profile-picture.jpg"}
                                alt=""
                            />
                        </Link>

                        <span className="postUsername">
                            {user.username}
                        </span>
                        <Alarm className="postIconTime" />
                        <span className="postDate">{format(post.createdAt)}</span>

                    </div>

                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>

                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="Post Image" className="postImg" />
                </div>

                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={PF + "reactions/like.jpeg"} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={PF + "reactions/dislike.png"} onClick={likeHandler} alt="" />

                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} Comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
