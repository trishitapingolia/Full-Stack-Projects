import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { API_BASE_URL } from '../config';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';

const Login = () => {
    const user = useSelector(state => state.userReducer);
    console.log(user);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setloading] = useState(false);

    const login = (e) => {
        e.preventDefault();
        setloading(true);

        const requestData = { email: email, password }
        axios.post(`${API_BASE_URL}/auth/login`, requestData)
            .then((result) => {
                if (result.status === 200) {
                    setloading(false);

                    localStorage.setItem("token", result.data.result.token);
                    localStorage.setItem("user", JSON.stringify(result.data.result.user));
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });
                    
                    setloading(false);
                    navigate('/');
                    dispatch({ type: 'LOGIN_SUCCESS', payload: result.data.result.user });

                    toast.success("Logged in Successfully!", {
                        position: "top-right"
                    });
                }
                setemail("");
                setpassword("");
            })
            .catch((err) => {
                setloading(false);

                console.log(err);
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }




    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f5f4f5", height: "43.4em" }}>
            <div className='reg-loginbox'>
                <div className='row' style={{ height: "100%" }}>
                    <div className='col-5 d-flex align-items-center justify-content-center' style={{ backgroundColor: "rgb(28, 162, 251)" }}>
                        <div>
                            <h3 style={{ color: "white" }}>Join Us</h3>
                            <img src='https://img.playbook.com/orePRNDkH7RnAP_88IDiUD87o5RQfdtnWoHJEqZynQk/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljLzYxYzVjNjhj/LTc2ZjMtNGY2Ny05/YzA1LTk5MDg5OWRi/ZmU1ZQ' alt='chatlogo' style={{ width: "90px" }} />
                        </div>
                    </div>
                    <div className='col-7' style={{ backgroundColor: "white" }}>
                        <div className='p-3 mt-3 mb-3'>
                            <h3 style={{ fontWeight: "bold" }}>Login</h3>
                            <Form onSubmit={(e)=>login(e)}>
                                <FloatingLabel controlId="floatingInput" label="Email" className="mb-2 mt-5">
                                    <Form.Control value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-2">
                                    <Form.Control  value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
                                </FloatingLabel>
                            <button className='btn btn-dark me-2 mt-3 mb-2' type="submit">Login
                            {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : ""}
                            </button>
                            </Form>
                            <ToastContainer/>
                            <p style={{ fontSize: "14px" }}>Don't have an account? <Link to='/register'>Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login