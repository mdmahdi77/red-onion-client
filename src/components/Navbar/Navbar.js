import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/Auth';
import logo from '../../images/logo2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

const Navbar = (props) => {
    const auth = useAuth()
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <Link class="navbar-brand" to="/"> <img src={logo} alt="red-onion-logo" /> </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav justify-content-end align-items-center" style={{ width: "100%" }}>
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="/home"><span className="text-dark fw-bold">Home</span></Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="/cart"><FontAwesomeIcon className="text-dark" icon={faCartArrowDown} /> <span className="fw-bolder text-dark">{(props.cart?.length)}</span></Link>
                            </li>
                            <li class="nav-item">
                                {
                                    auth.user ?
                                <Link class="nav-link" to="/cart"><span className="text-success">{auth.user?.displayName}</span></Link>
                                :
                                <Link class="nav-link" to="/login">Login</Link>
                                }
                            </li>
                            <li class="nav-item">
                                {
                                    auth.user ?
                                    <Link class="nav-link" to="/login">
                                        <button onClick={() => {auth.signOut()}} className="btn btn-danger btn-rounded">Sign Out</button>
                                    </Link>
                                    :
                                    <Link class="nav-link" to="/login">
                                        <button className="btn btn-danger btn-rounded">Sign Up</button>
                                    </Link>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;