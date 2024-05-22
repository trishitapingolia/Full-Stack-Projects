import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const dotenv = require('dotenv');

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

const AddProduct = () => {
    const [image, setImage] = useState({ preview: '', data: '' });
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        console.log(img.data);
        setImage(img);
    }

    const handleImgUpload = async () => {
        let formData = new FormData();
        console.log(formData);
        formData.append('file', image.data);
        console.log(formData);
        console.log(image.data);
        const response = await axios.post(`${API_BASE_URL}/uploadfile`, formData);
        return response;
    }

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const addProduct = async () => {
        if (productName === '') {
            toast.error("Please enter product name", {
                position: "top-right"
            });
        } else if (image.preview === '') {
            toast.error("Please enter image", {
                position: "top-right"
            });
        } else if (price === '') {
            toast.error("Please enter price", {
                position: "top-right"
            });
        } else if (description === '') {
            toast.error("Please enter description", {
                position: "top-right"
            });
        } else if (category === '') {
            toast.error("Please enter category", {
                position: "top-right"
            });
        } else {
            setLoading(true);
            const imgRes = await handleImgUpload();
            const request = {productName: productName, image : `${API_BASE_URL}/files/${imgRes.data.filename}`,price:price,description:description, category:category}
            await axios.post(`${API_BASE_URL}/addproduct`,request, CONFIG_OBJ)
                .then((response) =>{
                    if(response.status===201){
                        setLoading(false);
                        toast.success("1 Product Added!", {
                            position: "top-right"
                          });
                    }
                    setProductName('');
                    setPrice('');
                    setCategory('');
                    setImage('');
                    setDescription('');
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                    toast.error(err.response.data.Error, {
                      position: "top-right"
                    });
                  });
        }
    }

    return (
        <div>
            <ToastContainer/>
            <div className='container m-4'>
                <div style={{ fontWeight: "500" }}>Add Image</div>
                <input name='file' onChange={handleImageFile} className="form-control mt-2" type="file" accept='.jpeg,.png,.jpg' id="formFile"></input>
                <div>
                  {image.preview && <div><img className='post-img mt-2' style={{maxWidth:"100px"}} alt='upload-img' src={image.preview} /></div>}
                </div>
            </div>
            <div className='container m-4'>
                <div style={{ fontWeight: "500" }}>Add Product Details</div>
                <div className="form-floating mt-2">
                    <input value={productName} type="text" onChange={(e) => setProductName(e.target.value)} className="form-control" id="floatingPassword" placeholder="Product Title" />
                    <label htmlFor="floatingPassword">Product Title</label>
                </div>
                <div className="form-floating mt-2">
                    <input value={description} type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" id="floatingdescription" placeholder="description" />
                    <label htmlFor="floatingdescription">Product Description</label>
                </div>
                <div className="form-floating mt-2">
                    <input value={price} type="number" onChange={(e) => setPrice(e.target.value)} className="form-control" id="floatingprice" placeholder="price" />
                    <label htmlFor="floatingprice">Product Price</label>
                </div>
                <div className='mt-2'>
                        <select onChange={(e)=>setCategory(e.target.value)} value={category} class="form-select" aria-label="Default select example">
                        <option selected>Category</option>
                        <option value="Men-Shoes">Men-Shoes</option>
                        <option value="Men-Loafers">Men-Loafers</option>
                        <option value="Men-Boots">Men-Boots</option>
                        <option value="Men-Flats">Men-Flats</option>
                        <option value="Men-Sneakers">Men-Sneakers</option>
                        <option value="Women-Shoes">Women-Shoes</option>
                        <option value="Women-Heels">Women-Heels</option>
                        <option value="Women-Boots">Women-Boots</option>
                        <option value="Women-Flats">Women-Flats</option>
                        <option value="Women-Sneakers">Women-Sneakers</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <Link onClick={addProduct} type="submit" className="btn btn-danger float-end" style={{ marginTop: "20px", width: "100px" }}>Add
                    {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> : ""}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AddProduct