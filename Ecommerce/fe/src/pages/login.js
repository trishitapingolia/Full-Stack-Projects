import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import {useNavigate} from  'react-router-dom';


const Login = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setloading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        setloading(true);
        const request = {email:Email, password:Password};
        axios.post(`${API_BASE_URL}/login`, request)
            .then((response)=>{
                if (response.status === 200){
                    setloading(false);

                    localStorage.setItem("token", response.data.result.token);
                    localStorage.setItem("user", JSON.stringify(response.data.result.user));

                    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.result.user });
                    navigate("/")
                    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.result.user });

                    toast.success("Logged in Successfully!", {
                        position: "top-right"
                    });
                }
                setEmail("");
                setPassword("");
            })
            .catch((err)=>{
                setloading(false);
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }
    return (
        <div className='container d-flex justify-content-center login'>
            <ToastContainer />
            <Form style={{ width: "500px" }} onSubmit={(e) => login(e)}>
                <h1 className='mb-4'>Login</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={Email} onChange={(e) => setEmail(e.target.value)} className='input' type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={Password} onChange={(e) => setPassword(e.target.value)} className='input' type="password" placeholder="Password" />
                </Form.Group>
                <Button type='submit' className='btn btn-warning'>Login
                    {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : ""}
                </Button>
                <p>New customer?<a href='/signup'>Create your account</a></p>
            </Form>
        </div>
    )
}

export default Login