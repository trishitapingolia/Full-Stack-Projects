import React, { useEffect, useState } from 'react'
import axios from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

const AllOrders = () => {
    const [AllOrders, setAllOrders] = useState("");
    console.log(AllOrders);

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const getAllOrders = async () => {
        await axios.get(`${API_BASE_URL}/allorders`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setAllOrders(response.data.orders);
                }
            })
            .catch((err) => {
                console.log(err.message);
            })
    }
    useEffect(() => {
        getAllOrders();
    }, [])

    return (
        <div className='container' style={{maxHeight:"80vh" ,overflowY:"scroll"}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">User</th>
                    </tr>
                </thead>
                <tbody>
                    {AllOrders ? AllOrders.map((order) => {
                        return (
                            <tr key={order._id}>
                                <th scope="row">{order._id}</th>
                                <td>{order.amount}</td>
                                <td>{order.status}</td>
                                <td>{order.author.Name}</td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    )
}

export default AllOrders