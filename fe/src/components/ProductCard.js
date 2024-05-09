import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ imgSrc, title, description, price, productId }) => {

    const addtocart = (e) => {
        e.preventDefault();
        const newItem = { productId, price, title, imgSrc };
        let items = JSON.parse(localStorage.getItem("items")) || [];
        items.push(newItem);
        setIsAdded(true)
        localStorage.setItem("items", JSON.stringify(items));
        toast.success("Product Added!", {
            position: "bottom-right"
        });
    }

    const [IsAdded, setIsAdded] = useState(false);

    const navigate = useNavigate();

    const showdetails = (Id) => {
        navigate(`/productdetail/${Id}`);
    }

    return (
        <div className="col-lg-2 col-md-4 col-6 p-1">
            <ToastContainer />
            <div className="card text-center m-1 new">
                <img style={{ cursor: "pointer" }} onClick={() => showdetails(productId)} src={imgSrc} className="card-img-top" alt="card-img" />
                <div className="card-body">
                    <h6 className="card-title">{title}</h6>
                    <p className="card-text" style={{ fontSize: 'x-small' }}>{description}</p>
                    <h6>&#x20b9; {price}/-</h6>
                    {!IsAdded ? <Link onClick={(e) => addtocart(e)} type='submit' className="btn btn-outline-dark">
                        <i className="fa-solid fa-bag-shopping fa-sm p-1"></i>
                        Add to Bag
                    </Link> : <Link className="btn btn-outline-dark disabled">
                        <i className="fa-solid fa-bag-shopping fa-sm p-1"></i>
                        Added
                    </Link>}
                </div>
            </div>
        </div>
    )
}

export default ProductCard