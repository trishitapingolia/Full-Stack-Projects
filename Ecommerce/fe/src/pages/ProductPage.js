import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const dotenv = require('dotenv');

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

const ProductPage = () => {
    const { productId } = useParams();
    const [product, setproduct] = useState("");
    console.log(product);
    
    const getproduct = async() =>{
        await axios.get(`${API_BASE_URL}/products/${productId}`)
            .then((response)=>{
                if(response.status===200){
                    setproduct(response.data.product)
                }
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    const addtocart = (e) => {
        const price = product.price;
        const title = product.productName;
        const imgSrc = product.image;
        e.preventDefault();
        const newItem = { productId, price, title, imgSrc };
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.push(newItem);
        localStorage.setItem("items", JSON.stringify(items));
        toast.success("Product Added!", {
            position: "bottom-right"
        });
    }

    useEffect(() => {
        getproduct();
    }, [])

    return (
        <div className='row'>
            <ToastContainer/>
            <div className="col-6">
                <img className='float-end' src={product.image} style={{ width: "50%" }} alt="product_image" />
            </div>
            <div className='col-6'>
                <div className='fs-2' style={{ fontFamily: "fantasy" }}>
                    {product.productName}
                </div>
                <div>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                </div>
                <p style={{ fontSize: "25px", fontFamily: "cursive" }}>&#x20b9;{product.price}</p>
                <div style={{ fontSize: "16px" }}>
                    Description:<br /> {product.description}.
                </div>
                <Link onClick={(e)=>addtocart(e)} className='btn btn-warning mt-3 me-1'>
                    Add to Cart
                </Link>
            </div>
        </div>
    )
}

export default ProductPage