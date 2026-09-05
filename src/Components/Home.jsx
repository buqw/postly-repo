import Nav from "./Nav"
import PostTemplate from "./PostTemplate"
export default function Home(props){

    return(
        <div className="container ">
            <Nav/>
            <div id="postsCont" className="mt-5">
                <PostTemplate/>
                <PostTemplate/>
                <PostTemplate/>
                <PostTemplate/>
                <PostTemplate/>
            </div>
        </div>
    );
}