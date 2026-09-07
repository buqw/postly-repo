import { useState } from "react"
import axios from "axios"
import pfp from "../assets/pfp.jpg"

export default function Nav(props){
    const [regUsername,setRegUsername] = useState("")
    const RUNChange = (e)=>{
        setRegUsername(e.target.value);
    }

    const [regPass,setRegPass] = useState("")
    const RPChange = (e)=>{
        setRegPass(e.target.value);
    }

    const [name,setName] = useState("")
    const nameChange = (e)=>{
        setName(e.target.value)
    }

    const [email,setEmail] = useState("")
    const emailChange = (e)=>{
        setEmail(e.target.value)
    }

    const handleRegisterClose = (e)=>{
        e.preventDefault()
        setRegUsername("");
        setRegPass("")
        setName("")
        setEmail("")
    }

    const handleLoginClose = (e)=>{
        e.preventDefault()
        setUsername("")
        setPassword("")
    }

    const handleRegister = async (e)=>{
        e.preventDefault()
        setRegUsername("");
        setRegPass("")
        setName("")
        setEmail("")
        if(regUsername && regPass && name && email){
            try{
                const response = await axios.post("https://tarmeezacademy.com/api/v1/register",{
                    username:regUsername,
                    password:regPass,
                    name:name,
                    email:email        
                })
                props.setLoggedIn(true)
                props.setToken(response.data.token)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("user",JSON.stringify(response.user))
                setShowAlert(true)
                setAlertType("green")
                setAlertMessage("Registered Successfully!")
                autoCloseAlert();
            }catch(err){
                setAlertType("red")
                setAlertMessage(err.response?.data?.message)
                setShowAlert(true)
                autoCloseAlert();        
            }
        }else{
            setAlertType("red")
            setAlertMessage("Missing data fields.")
            setShowAlert(true)
            autoCloseAlert();                     
        }
    }

    const [username,setUsername] = useState("");
    const usenameLoginChange = (e)=>{
        setUsername(e.target.value)
    }

    const [password,setPassword] = useState("");
    const passwordLoginChange = (e)=>{
        setPassword(e.target.value)
    }


    const handleLogin = async (e)=>{
        e.preventDefault()
        setUsername("")
        setPassword("")        
        if(username && password){
            try{
                const response = await axios.post("https://tarmeezacademy.com/api/v1/login",
                    {
                        "username": username,
                        "password":password
                    },
                )
                localStorage.setItem("token",response.data.token)
                props.setToken(response.data.token)
                props.setLoggedIn(true)
                localStorage.setItem("user",JSON.stringify(response.data.user))
                setShowAlert(true)
                setAlertMessage("Logged in Succeessfully!")                
                setAlertType("green")
                autoCloseAlert();
            }catch(err){
                setAlertType("red")
                setAlertMessage(err.response?.data?.message)
                setShowAlert(true)
                autoCloseAlert();

            }
        }else{
            setAlertType("red")
            setAlertMessage("Missing data fields.")
            setShowAlert(true)
            autoCloseAlert();

        }
    }

    const handleLogoutBtn = (e)=>{
        e.preventDefault();
        props.setLoggedIn(false)
        props.setToken("")
        localStorage.setItem("token","")
        localStorage.setItem("user","")
        setShowAlert(true)
        setAlertType("red")
        setAlertMessage("Logged out Successfully")
        autoCloseAlert();
    }

    const [showAlert,setShowAlert] = useState(false);
    const [alertType,setAlertType] = useState("")
    const [alertMessage,setAlertMessage] = useState("")
    const autoCloseAlert = ()=>{
        setTimeout(()=>{
            setShowAlert(false)
        },5000)
    }
    return(
        <nav id="navi" className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Postly</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="#">Profile</a>
                        </li>
                    </ul>

                    <div className="d-flex ms-auto align-items-center">

                        {props.loggedIn && (
                            <div className="d-flex align-items-center me-2">
                                <img
                                    src={pfp}
                                    className="rounded-circle navPfp border border-2 border-dark-subtle"
                                    alt=""
                                />
                                <p className="mx-2 my-0">p2n_</p>
                            </div>
                        )}

                        {props.loggedIn ? (
                            <button
                                onClick={handleLogoutBtn}
                                type="button"
                                className="btn btn-outline-danger"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-outline-success mx-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                >
                                    Login
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    data-bs-toggle="modal"
                                    data-bs-target="#registerModal"
                                >
                                    Register
                                </button>
                            </>
                        )}

                    </div>
                </div>
            </div>

        {showAlert &&
            (<div id="alertSucc" className={alertType == "red" ? "alert-danger alert alert-dismissible" :"alert-success alert alert-dismissible"} role="alert" >
                <div>{alertMessage}</div>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAlert(false)} >
                </button>
            </div>)}                    

            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Login</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <div className="mb-3">
                            <label htmlFor="recipient-name" className="col-form-label">Username</label>
                            <input value={username} onChange={usenameLoginChange} type="text" className="form-control" id="recipient-name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Password</label>
                            <input value={password} onChange={passwordLoginChange} className="form-control" id="message-text" type="password"/>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleLoginClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleLogin} type="button" data-bs-dismiss="modal" className="btn btn-primary">Login</button>
                    </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="registerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Register</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                            <div className="mb-3">
                                <label htmlFor="recipient-name" className="col-form-label">Username</label>
                                <input value={regUsername} onChange={RUNChange} type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Password</label>
                                <input value={regPass} onChange={RPChange} className="form-control" id="message-text" type="password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Name</label>
                                <input value={name} onChange={nameChange} className="form-control" id="message-text" type="text"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Email</label>
                                <input value={email} onChange={emailChange} className="form-control" id="message-text" type="email"/>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={handleRegisterClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleRegister} type="button" data-bs-dismiss="modal" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}