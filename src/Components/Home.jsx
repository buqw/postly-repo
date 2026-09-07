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
                setError(err.response?.data?.message)
                console.log(`Error loading posts: ${error}`)
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
                        let tagsName= post.tags.map(tag=> tag.name)
                        return <PostTemplate key={post.id} title={post.title || null} body={post.body} authorUsername={post.author.username} image={post.image} authorImage={post.author.profile_image} created_at={post.created_at} comments_count={post.comments_count} tagsName={tagsName}/>
                    })}
                </div>
            )}

            {props.loggedIn && (
                <button data-bs-toggle="modal" data-bs-target="#addPost" id="addPostBtn" className="btn bg-primary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="3.5rem"
                        height="3.5rem"
                        fill="currentColor"
                        className="bi bi-plus-circle"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                </button>
            )}
  
            <div class="modal fade" id="addPost" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Create New Post</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Post image</label>
                            <input type="file" class="form-control" id="recipient-name"/>
                        </div>
                        <div class="mb-3">
                            <label for="recipient-name" class="col-form-label">Post title</label>
                            <input type="text" class="form-control" id="recipient-name"/>
                        </div>
                        <div class="mb-3">
                            <label for="message-text" class="col-form-label">Post body</label>
                            <textarea class="form-control" id="message-text"></textarea>
                        </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Post</button>
                    </div>
                    </div>
                </div>
            </div>
 
        </div>
    );
}