import React, { useEffect, useState } from 'react'
import Share from './share/Share'
import Post from "./post/Post"
import "./feed.css"
import axios from 'axios'

export default function Feed({ username }) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const resp =
                    username ?
                        await axios.get('/posts/profile/' + username) :
                        await axios.get('/posts/timeline/61c48f74ca39d3ec48612b38')
                setPosts(resp.data)
                console.log("Feed data :")
                console.log(resp)

            } catch (err) {
                console.log("User Feed data  Err:  " + err + " ")
            }
        };

        fetchPosts();
    }, [username]);



    return (
        <div className="feed">
            <div className="feedWrapper">
                <Share />
                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))}
            </div>
        </div>
    )
}
