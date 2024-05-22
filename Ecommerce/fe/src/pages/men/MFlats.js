import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../config';
import axios from 'axios';
import ProductCard from '../../components/ProductCard'

const MFlats = () => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const getProducts = () => {
    axios.get(`${API_BASE_URL}/allproducts`)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.products.filter(product => product.category == "Men-Flats"));
        }
      })
  }
  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div>
      <div class="container-fluid mt-5 mb-5">
        <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: 'rgb(74, 74, 74)' }}>FLATS</h2>
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
    </div>
  )
}

export default MFlats