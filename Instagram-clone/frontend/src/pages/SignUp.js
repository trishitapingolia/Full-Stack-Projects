import './SignUp.css';
import React, { useState } from 'react';
import Logo from '../images/Logo.PNG';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';
import Swal from 'sweetalert2';

import { faFacebookSquare, fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab, faFacebookSquare)



const SignUp = () => {

    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");

    const [loading, setloading] = useState(false);

    const signup = (e) => {
        e.preventDefault();
        setloading(true);

        const requestData = { fullName: fullName, email, password, username }
        axios.post(`${API_BASE_URL}/signup`, requestData)
            .then((result) => {
                if (result.status===201) {
                    setloading(false);

                    Swal.fire({
                        icon: 'success',
                        title: 'User Signed Up Successfully!'
                    })
                }
                setfullName("");
                setemail("");
                setpassword("");
                setusername("");
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
        <div className='main-box container d-flex'>
            <div>
                <div className='signup-container'>
                    <img src={Logo} alt='logo' />
                    <span className='top-text'>Sign up to see photos and videos from your friends.</span>
                    <Form onSubmit={(e) => signup(e)}>
                        <Button className='bttn' variant="primary"><FontAwesomeIcon icon="fab fa-facebook-square" style={{ color: "white", }} /> Log in with Facebook</Button>
                        <hr />
                        <span className='text-muted'>OR </span><br />
                        <div className='form'>
                            <Form.Control value={email} onChange={(e) => setemail(e.target.value)} className='user' type="tel" placeholder="Mobile Number or Email" />
                            <Form.Control value={fullName} onChange={(e) => setfullName(e.target.value)} className='user' type="text" placeholder="Full Name" />
                            <Form.Control value={username} onChange={(e) => setusername(e.target.value)} className='user' type="text" placeholder="Username" />
                            <Form.Control value={password} onChange={(e) => setpassword(e.target.value)} className='password' type="password" placeholder="Password" />
                            <div className='terms-text'>
                                <span className='terms'>People who use our service may have uploaded your contact information to Instagram. Learn More</span>
                                <span className='terms'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</span>
                            </div>
                            <Button type='submit' className='bttn' variant="primary">Sign up
                                {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : ""}
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='login-box'>
                    <span>Already have an account?</span>
                    <Link to={'/login'} className='login-text'>Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;