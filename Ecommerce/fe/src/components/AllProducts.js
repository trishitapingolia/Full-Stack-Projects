import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const dotenv = require('dotenv');

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);
    console.log(allProducts);
    
    const getallproducts = async () => {
        await axios.get(`${API_BASE_URL}/allproducts`)
            .then((response) => {
                if (response.status === 200) {
                    setAllProducts(response.data.products);
                }
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const deleteproduct = async (id) => {
        await axios.delete(`${API_BASE_URL}/${id}/deleteproduct`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    getallproducts();
                    toast.success("1 Product Deleted Successfully!", {
                        position: "top-right"
                      });
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                  });
            })
    }

    useEffect(() => {
        getallproducts();
    }, [])

    return (
        <div className='container' style={{maxHeight:"80vh" ,overflowY:"scroll"}}>
            <ToastContainer />
            {allProducts ? allProducts.map((product) => {
                return (
                    <div className='container d-flex mt-2' key={product._id}>
                        <div>
                            <img className='p-image' src={product.image} alt={product.category} />
                        </div>
                        <div className='container d-flex flex-column'>
                            <h6>&#x20b9;{product.price}/-</h6>
                            <span style={{ fontSize: "13px" }}>{product.productName}</span>
                            <a className='mt-2' style={{ fontSize: "14px",cursor:"pointer" }}><i class="fa-solid fa-pen-to-square"></i>Edit</a>
                        </div>
                        <div>
                            <div onClick={()=>deleteproduct(product._id)} style={{ fontSize: "14px",cursor:"pointer" }}><i class="fa-solid fa-trash-can"></i></div>
                        </div>
                    </div>
                )
            }) : ""}
        </div>
    )
}

export default AllProducts