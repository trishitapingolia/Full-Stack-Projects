import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AllProducts = () => {
    const [AllProducts, setAllProducts] = useState("");
    console.log(AllProducts);
    const getallproducts = async () => {
        await axios.get(`${API_BASE_URL}/allproducts`)
            .then((response) => {
                if (response.status === 200) {
                    setAllProducts(response.data.products);
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
        <div>
            <ToastContainer/>
            <div className="container-fluid mt-4">
                <div className="row">
                    {AllProducts ? AllProducts.map((product) => {
                        return (
                            <ProductCard 
                                productId={product._id}
                                key={product._id}
                                imgSrc={product.image}
                                title={product.productName}
                                description={product.description}
                                price={product.price}
                            />
                        )
                    }) : ""}
                </div>
            </div>
        </div>
    )
}

export default AllProducts