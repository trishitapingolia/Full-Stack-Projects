import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config';
import axios from 'axios';

const AllCustomers = () => {
    const [AllCustomers, setAllCustomers] = useState("");
    console.log(AllCustomers);
    
    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const getAllCustomers = async () => {
        await axios.get(`${API_BASE_URL}/allcustomers`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setAllCustomers(response.data.Users);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        getAllCustomers();
    }, [])

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">Customer Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">PhoneNumber</th>
                        <th scope="col">Type</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {AllCustomers ? AllCustomers.map((customer) => {
                        return (
                            <tr key={customer._id}>
                                <th scope='row'>{customer._id}</th>
                                <td>{customer.Name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phoneNumber}</td>
                                <th scope='row'>{customer.isAdmin? "Admin" : "Customer"}</th>
                                <td>{customer.address}</td>
                            </tr>
                        )
                    }) : ""}
                </tbody>
            </table>
        </div>
    )
}

export default AllCustomers