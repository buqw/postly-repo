import pfp from "../assets/pfp.jpg"
import postImg from "../assets/post-img.jpg" 
export default function PostTemplate(props){

    return(
        <div className="card shadow my-5">
            <div className="card-header">
                <img id="pfp" src={pfp} alt="" className="rounded-circle border border-2 border-dark-subtle"/>
                <b className="mx-2">{props.authorUsername}</b>
            </div>
            <div className="card-body">
                <img src={props.image} alt="" className="w-100 rounded-2"/>
                <h5 className="mt-3 mb-1">{props.title}</h5>
                <p className="mb-1">{props.body}</p>
                <p className="text-secondary mb-0">{props.created_at}</p>      
                <hr/>
                <div>
                    <svg className="pointer-cursor" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-dots" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                    <span className="mb-1 mx-2 pointer-cursor">{`${props.comments_count} Comments`}</span>
                </div>
            </div>
        </div>
    )
}

    /*
            )}*/
