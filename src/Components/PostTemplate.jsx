import pfp from "../assets/pfp.jpg"
import postImg from "../assets/post-img.jpg" 
export default function PostTemplate(props){

    return(
        <div class="card shadow my-5">
            <div class="card-header">
                <img id="pfp" src={pfp} alt="" className="rounded-circle border border-2 border-dark-subtle"/>
                <b className="mx-2">@p2n_</b>
            </div>
            <div class="card-body">
                <img src={postImg} alt="" className="w-100 rounded-2"/>
                <p className="text-secondary mb-1">1 min ago</p>
                <h5 className="mt-1 mb-1">Hello World</h5>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti debitis tenetur culpa doloribus maiores, illo molestias doloremque reiciendis architecto aliquid necessitatibus ab sint quibusdam provident ratione optio exercitationem quasi! Maiores.</p>
                <hr/>
                <div className="pointer-cursor">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                    <span className="mb-1 mx-2">(3) Comments</span>

                </div>
            </div>
        </div>
    )
}

    
