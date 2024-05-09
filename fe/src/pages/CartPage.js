import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [items, setitems] = useState([]);
  const itemsInCart = () => {
    const totalItems = JSON.parse(localStorage.getItem("items")) || [];
    setitems(totalItems);
  }

  const navigate = useNavigate();

  const CONFIG_OBJ = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  }

  const updateLocalStorage = (updatedItems) => {
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  const increaseQuantity = (id) => {
    const updatedItems = items.map(item => {
      if (item.productId === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 };
      }
      return item;
    });
    setitems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  const decreaseQuantity = (id) => {
    const updatedItems = items.map(item => {
      if (item.productId === id) {
        const newQuantity = (item.quantity || 1) - 1;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
      }
      return item;
    });
    setitems(updatedItems);
    updateLocalStorage(updatedItems);
  }

  const removeItem = (id) => {
    const updatedItems = items.filter(item => item.productId !== id);
    setitems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  const calTotalAmount = () => {
    let totalAmount = 0;
    items.forEach(item => {
      totalAmount += (item.price * (item.quantity || 1));
    });
    return totalAmount;
  }
  const [loading, setloading] = useState(false);

  const addorder = async () => {
    setloading(true);
    const totalAmount = calTotalAmount();
    console.log(totalAmount);
    const request = {
      amount: totalAmount,
      products: items.map(item => item.productId),
      status: "pending",
    }
    await axios.post(`${API_BASE_URL}/addorder`, request, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 201) {
          setloading(false);
          const orderId = response.data.newOrder._id;
          console.log(orderId);
          navigate(`/shipping/${orderId}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    itemsInCart();
  }, []);

  return (
    <div className='row m-5'>
      <div className='col'>
        {items.length > 0 ? items.map((item) => {
          return (
            <div key={item.productId} className='card product-card p-2 mb-2'>
              <div className='row'>
                <div className='col'>
                  <img className='product-img' src={item.imgSrc} alt={item.title} />
                  <strong className='p-name'>{item.title}</strong>
                </div>
                <div className='col container d-flex justify-content-center align-items-center'>
                  <div className='float-end p-name'>
                    <i style={{ cursor: "pointer" }} className="fa-solid fa-circle-minus" onClick={() => decreaseQuantity(item.productId)}></i>
                    <span> {item.quantity || 1} </span>
                    <i style={{ cursor: "pointer" }} className="fa-solid fa-circle-plus" onClick={() => increaseQuantity(item.productId)}></i>
                  </div>
                </div>
                <div className='col container d-flex justify-content-center align-items-center p-name'>
                  <span className='float-end'>&#x20b9;{item.price * (item.quantity || 1)}</span>
                </div>
                <div className='p-name col container d-flex justify-content-center align-items-center'>
                  <i style={{ cursor: "pointer" }} className="fa-solid fa-trash float-end pe-2" onClick={() => removeItem(item.productId)}></i>
                </div>
              </div>
            </div>
          )
        }) : <h4>No items in the cart</h4>}
      </div>
      <div className='col'>
        <div className='checkout-card card'>
          <p className='p-name m-3 mb-0' style={{ fontWeight: "bold" }}>Subtotal ({items.length} items): &#x20b9;{calTotalAmount()}</p>
          <hr />
          <Link onClick={addorder} className='btn btn-warning checkout'>Proceed to checkout
            {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div> : ""}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartPage