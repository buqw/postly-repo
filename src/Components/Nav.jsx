import { useState } from "react"
import axios from "axios"

export default function Nav(props){
    const [error,setError] = useState("")

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

    const handleRegister = (e)=>{
        e.preventDefault()
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
        if(username && password){
            try{
                console.log(username,password)
                const response = await axios.post("https://tarmeezacademy.com/api/v1/login",
                    {
                        "username": username,
                        "password":password
                    }
                )
                console.log(response.data)
            }catch(err){
                setError(`Error while login: ${err}`)
                console.log(err.response?.status)
                console.log(err.response?.data?.message)
            }
        }
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
                <div className="d-flex w-100 justify-content-end">
                    <button type="button" className="btn btn-outline-success mx-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
                    <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#registerModal">Register</button>
                </div>
                </div>
            </div>


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
                            <input onChange={usenameLoginChange} type="text" className="form-control" id="recipient-name"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message-text" className="col-form-label">Password</label>
                            <input onChange={passwordLoginChange} className="form-control" id="message-text" type="password"/>
                        </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button onClick={handleLogin} type="button" className="btn btn-primary">Login</button>
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
                                <input onChange={RUNChange} type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Password</label>
                                <input onChange={RPChange} className="form-control" id="message-text" type="password"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Name</label>
                                <input onChange={nameChange} className="form-control" id="message-text" type="text"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message-text" className="col-form-label">Email</label>
                                <input onChange={emailChange} className="form-control" id="message-text" type="email"/>
                            </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleRegister} type="button" className="btn btn-primary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}