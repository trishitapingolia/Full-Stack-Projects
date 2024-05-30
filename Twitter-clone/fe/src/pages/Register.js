import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

const Register = () => {

    const [fullName, setfullName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");

    const [loading, setloading] = useState(false);

    const register = (e) => {
        e.preventDefault();
        setloading(true);

        const requestData = { name: fullName, email: email, password: password, username: username }
        axios.post(`${API_BASE_URL}/auth/register`, requestData)
            .then((result) => {
                if (result.status === 201) {
                    setloading(false);

                    toast.success("User Registered Up Successfully!", {
                        position: "top-right"
                    });
                    
                }
                setfullName("");
                setemail("");
                setpassword("");
                setusername("");
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
                            <h3 style={{ fontWeight: "bold" }}>Register</h3>
                            <Form onSubmit={(e) => register(e)}>
                                <FloatingLabel label="FullName" className="mb-2">
                                    <Form.Control value={fullName} onChange={(e) => setfullName(e.target.value)} type="text" placeholder="fullname" />
                                </FloatingLabel>
                                <FloatingLabel label="Username" className="mb-2">
                                    <Form.Control value={username} onChange={(e) => setusername(e.target.value)} type="text" placeholder="username" />
                                </FloatingLabel>
                                <FloatingLabel label="Email" className="mb-2">
                                    <Form.Control value={email} onChange={(e) => setemail(e.target.value)} type="email" placeholder="name@example.com" />
                                </FloatingLabel>
                                <FloatingLabel label="Password" className="mb-2">
                                    <Form.Control value={password} onChange={(e) => setpassword(e.target.value)} type="password" placeholder="Password" />
                                </FloatingLabel>
                                <Button type='submit' className='btn btn-dark me-2'>Register
                                    {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : ""}
                                </Button><ToastContainer />
                            </Form>
                            <span style={{ fontSize: "14px" }}>Already Registered? <Link to='/login'>Login here</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register