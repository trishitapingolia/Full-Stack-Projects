import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Kids = () => {
    const [products, setProducts] = useState([]);
    console.log(products);
    const getProducts = () => {
        axios.get(`${API_BASE_URL}/allproducts`)
            .then((response) => {
                if (response.status === 200) {
                    setProducts(response.data.products.filter(product => product.category == "Kids"));
                }
            })
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div>
            <div className="container-fluid mt-4">
                <div className="row">
                    {products ? products.map((product) => {
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

export default Kids