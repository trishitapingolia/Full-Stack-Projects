import './login.css';
import React, { useState } from 'react';
import Mockup from '../images/Mockup.png';
import Logo from '../images/Logo.PNG';

import Logo2 from '../images/Logo2.jpg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import {useDispatch} from 'react-redux';



const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setloading] = useState(false);

    const login = (e) => {
        e.preventDefault();
        setloading(true);

        const requestData = { email:email, password }
        axios.post(`${API_BASE_URL}/login`, requestData)
            .then((result) => {
                if (result.status===200) {
                    setloading(false);

                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("user", JSON.stringify(result.data.result.user));
                    dispatch({type:'LOGIN_SUCCESS',payload: result.data.result.user});
                    setloading(false);
                    navigate('/posts');

                    Swal.fire({
                        icon: 'success',
                        title: 'Logged in Successfully!'
                    })
                }
                setemail("");
                setpassword("");
            })
            .catch((err) => {
                setloading(false);

                console.log(err);
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.Error
                })
            });
    }
    return (
        <div className='main container'>
            <div className='left-container d-none d-lg-block'>
                <img className='mockup' src={Mockup} alt='mobile-mockup' />
            </div>
            <div className='left-container d-lg-none d-sm-flex'>
                <img src={Logo2} style={{ width: "160px" }} alt='mobile-logo' />
            </div>
            <div className='right'>
                <div className='right-container'>
                    <img src={Logo} alt='logo' style={{marginTop:"12px"}} />
                    <Form onSubmit={(e) => login(e)}>
                        <Form.Control value={email} onChange={(e) => setemail(e.target.value)} className='user' type="text" placeholder="Phone number, username, or email" />
                        <Form.Control value={password} onChange={(e) => setpassword(e.target.value)} className='password' type="password" placeholder="Password" />
                        <Button type='submit' className='bttn' variant="primary">Log In
                        {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : ""}
                        </Button>
                        <hr />
                        <span className='text-muted'>OR </span><br />
                        <div className='facebook-f-pass'>
                            <div>
                            <i className="fa-brands fa-square-facebook"  style={{ color: "#385185", }}></i>
                                <span className='facebook-lgn'>Log in with Facebook</span>
                            </div>
                            <span className='f-password'>Forgot Password?</span>
                        </div>
                    </Form>
                </div>
                <div className='signup-box'>
                    <span>Don't have an account?</span>
                    <Link to={'/signup'} className='signup-text'>Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default Login