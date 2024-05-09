import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Preview = () => {
    const user = useSelector(state=>state.userReducer)
    console.log(user);

    const OrderId = useParams();
    console.log(OrderId);

    const [userData, setuserData] = useState("");
    console.log(userData);

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const [newOrder, setnewOrder] = useState("");
    console.log(newOrder);

    const getOrder = () => {
        const Id = OrderId.orderId;
        axios.get(`${API_BASE_URL}/orders/${Id}`, CONFIG_OBJ)
            .then((response) => {
                setnewOrder(response.data.order);
            });
    }

    const getuser = () => {
        const Id = user.user._id;
        axios.get(`${API_BASE_URL}/customer/${Id}`, CONFIG_OBJ)
            .then((response)=>{
                if (response.status===200) {
                    setuserData(response.data.User);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const ordertotal = () => {
        let total = 0;
        const shipping = 200;
        const tax = 104;
        total = newOrder.amount + shipping + tax;
        return total;
    }

    useEffect(() => {
        getOrder();
        getuser();
    }, []);

    return (
        <div className='container d-flex flex-column login'>
            <h1 className='mb-3 ms-3'>Preview Order</h1>
            <div className='row container d-flex'>
                <div className='col container d-flex flex-column'>
                    <div className='col mb-3'>
                        <div className='card p-4' style={{ maxWidth: "700px" }}>
                            <h4>Shipping</h4>
                            <div><strong>Name:</strong> {userData.Name}</div>
                            <div><strong>Address:</strong> {userData.address}</div>
                            <a href='#' className='mt-2'>Edit</a>
                        </div>
                    </div>
                    <div className='col mb-3'>
                        <div className='card p-4' style={{ maxWidth: "700px" }}>
                            <h4>Payment</h4>
                            <div><strong>Method:</strong> Paypal</div>
                            <a href='#' className='mt-2'>Edit</a>
                        </div>
                    </div>
                    <div className='col mb-3'>
                        <div className='card p-4' style={{ maxWidth: "700px" }}>
                            <h4>Items</h4>
                            {newOrder ? newOrder.products.map(product => {
                                return (
                                    <div className='row' key={product._id}>
                                        <div className='col'>
                                            <strong className='p-name'>{product.productName}</strong>
                                        </div>
                                        <div className='col container d-flex justify-content-center align-items-center'>
                                            <div className='float-end p-name'>
                                                <span> 1 </span>
                                            </div>
                                        </div>
                                        <div className='col container d-flex justify-content-center align-items-center p-name'>
                                            <span className='float-end'>&#x20b9;{product.price}</span>
                                        </div>
                                    </div>
                                )
                            }) : ""}
                        </div>
                    </div>
                </div>
                <div className='col checkout-card-area'>
                    <table style={{ maxWidth: "300px" }} className='table checkout-card card'>
                        <p className='p-name m-3 mb-0' style={{ fontWeight: "bold", minWidth: "300px" }}>Order Summary</p>
                        <tbody>
                            <tr><td className='p-name m-3 mb-0 ps-3 pe-3' style={{ minWidth: "280px" }}>Items: <span className='float-end'>&#x20b9;{newOrder.amount}</span></td></tr>
                            <tr><td className='p-name m-3 mb-0 ps-3 pe-3' style={{ minWidth: "280px" }}>Shipping: <span className='float-end'>&#x20b9;200</span></td></tr>
                            <tr><td className='p-name m-3 mb-0 ps-3 pe-3' style={{ minWidth: "280px" }}>Tax: <span className='float-end'>&#x20b9;104</span></td></tr>
                            <tr><td className='p-name m-3 mb-0 ps-3 pe-3' style={{ minWidth: "280px" }}>Order Total: <span className='float-end'>&#x20b9;{ordertotal()}</span></td></tr>
                        </tbody>
                        <Link className='btn btn-success checkout'>Place Order</Link>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Preview