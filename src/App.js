import './App.css';
import Home from "./Components/Home.jsx"
import { useState } from 'react';

function App() {
    const [token,setToken]= useState(()=>{
        const savedToken = localStorage.getItem("token")
        return savedToken ? savedToken:null;
    })
    const [loggedIn,setLoggedIn] = useState(()=>{
        return token ? true: false;
    })

    return (
        <div className="App">
            <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} token={token} setToken={setToken}/>
        </div>
    );
}

export default App;
