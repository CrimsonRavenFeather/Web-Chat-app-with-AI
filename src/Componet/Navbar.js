import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginInfoContext from '../Context/LogInContext'
export default function Navbar() {
    const { Myid, setMyid , UserName , setUserName } = useContext(LoginInfoContext)
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{position:"fixed",width:"100%"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Say Hello</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="navbar-nav d-flex">{UserName}</ul>
                </div>
            </nav>
        </>
    )
}
