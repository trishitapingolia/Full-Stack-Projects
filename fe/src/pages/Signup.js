import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {API_BASE_URL} from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const [Name, setName] = useState("");
    const [Number, setNumber] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [loading, setloading] = useState();

    const signup=(e) => {
        e.preventDefault();
        setloading(true);

        if(!Name || !Number || !Email || !Password){
            toast.error("Please enter all the required fields!", {
                position: "top-right"
              });
        }else{
            const request = {Name:Name, email:Email, password:Password,phoneNumber:Number};
            axios.post(`${API_BASE_URL}/signup`, request)
                .then((response)=>{
                    if(response.status === 201){
                        setloading(false);
                        toast.success("Signup successful!", {
                            position: "top-right"
                          });
                    }
                    setName("");
                    setNumber("");
                    setEmail("");
                    setPassword("");
                })
                .catch((err)=>{
                    setloading(false);
                    toast.error(err.response.data.Error, {
                        position: "top-right"
                      });
                    console.log(err.response.data.Error);
                });

        }
    }
    return (
        <div className='container d-flex justify-content-center login'>
            <ToastContainer />
            <Form style={{ width: "500px" }} onSubmit={(e)=>signup(e)}>
                <h1 className='mb-4'>Sign Up</h1>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={Name} onChange={(e)=>setName(e.target.value)} className='input' type="text" placeholder="Enter Name" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control value={Number} onChange={(e)=>setNumber(e.target.value)} className='input' type="number" placeholder="Enter phone number" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={Email} onChange={(e)=>setEmail(e.target.value)} className='input' type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={Password} onChange={(e)=>setPassword(e.target.value)} className='input' type="password" placeholder="Password" />
                </Form.Group>
                <Button type='submit' className='btn btn-warning'>Signup
                {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> : ""}
                </Button>
                <p>Already a customer?<a href='/login'>Login here</a></p>
            </Form>
        </div>
    )
}

export default Signup