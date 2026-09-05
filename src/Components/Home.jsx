import Nav from "./Nav"
import PostTemplate from "./PostTemplate"
import axios from "axios"
import { useEffect, useState } from "react";
export default function Home(props){
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState(null)

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get("https://tarmeezacademy.com/api/v1/posts?limit=5")
                setPosts(response.data.data)
            }catch(err){
                setError(err)
                console.log(`Error loading posts: ${err}`)
            }finally{
                setLoading(false)
            }
        }
        fetchData()
    },[])
    return(
        <div className="container d-flex flex-column min-vh-100 ">
            <div>
                <Nav loggedIn={props.loggedIn} setLoggedIn={props.setLoggedIn} setToken={props.setToken}/>
            </div>
            {loading ?(
                <div className="HomeLoadingDiv">
                    <div className="text-center">
                        <div className="spinner-border text-secondary" style={{width:"3rem", height: "3rem"}} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            )
            :
            (
                <div id="postsCont" className="mt-5">
                    {posts.map((post)=>{
                        return <PostTemplate title={post.title || null} body={post.body} authorUsername={post.author.username} image={post.image} created_at={post.created_at} comments_count={post.comments_count} tags={post.tags}/>
                    })}
                </div>
            )}

  

 
        </div>
    );
}