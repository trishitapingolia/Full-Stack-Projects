import React, { useState } from 'react'
import AllCustomers from '../components/AllCustomers'
import AddProduct from '../components/AddProduct'
import AllProducts from '../components/AllProducts'
import AllOrders from '../components/AllOrders'

const Admin = () => {
    const [Panel, setPanel] = useState(<AddProduct/>);
    const addproduct = () => {
        setPanel(<AddProduct/>);
    }
    const allproducts = () => {
        setPanel(<AllProducts/>);
    }
    const allorders = () => {
        setPanel(<AllOrders/>);
    }
    const allcustomers = () => {
        setPanel(<AllCustomers/>);
    }
    return (
        <div className='container-fluid row'>
            <div className='col-3'>
                <div onClick={addproduct} className='panels' style={{ backgroundColor: "#20a8d8" }}>
                    + Add Product
                </div>
                <div onClick={allproducts} className='panels' style={{ backgroundColor: "#EDA552" }}>
                    All Products
                </div>
                <div onClick={allorders} className='panels' style={{ backgroundColor: "#42ccbb" }}>
                    All Orders
                </div>
                <div onClick={allcustomers} className='panels' style={{ backgroundColor: "#f86c6b" }}>
                    All Customers
                </div>
            </div>
            <div className='col-9'>
                {Panel}
            </div>
        </div>
    )
}

export default Admin