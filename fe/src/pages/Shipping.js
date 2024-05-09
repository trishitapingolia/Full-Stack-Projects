import React, { useState } from 'react'
import {Link, useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import {useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const user = useSelector(state => state.userReducer);
  console.log(user);
  const OrderId = useParams();
  console.log(OrderId);

  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [postalCode, setpostalCode] = useState("");
  const [Country, setCountry] = useState("");
  const [loading, setloading] = useState(false);

  const shippingdetails = async(e) => {
    const Order_Id = OrderId.orderId;
    setloading(true);
    e.preventDefault();
    const Id = user.user._id;
    const address = Address + ' ' +City + ' ' + Country + ' '+postalCode;
    const request = {Name: Name, address: address}
    await axios.put(`${API_BASE_URL}/${Id}/editprofile`, request , CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          setloading(false);
          navigate(`/payment/${Order_Id}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className='container d-flex justify-content-center login'>
      <Form style={{ width: "500px" }}>
        <h1 className='mb-4'>Shipping Address</h1>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control value={Name} onChange={(e) => setName(e.target.value)} className='input' type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control value={Address} onChange={(e) => setAddress(e.target.value)} className='input' type="text" placeholder="Enter address" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control value={City} onChange={(e) => setCity(e.target.value)} className='input' type="text" placeholder="Enter city" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control value={postalCode} onChange={(e) => setpostalCode(e.target.value)} className='input' type="number" placeholder="Enter postal code" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control value={Country} onChange={(e) => setCountry(e.target.value)} className='input' type="text" placeholder="Enter country" />
        </Form.Group>
        <Link onClick={(e)=>shippingdetails(e)} type='submit' className='btn btn-warning'>Next
          {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> : ""}
        </Link>
      </Form>
    </div>
  )
}

export default Shipping