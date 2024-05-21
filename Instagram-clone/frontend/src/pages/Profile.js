import React, { useEffect } from 'react'
import '../App.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector(state => state.userReducer);
    const [image, setImage] = useState({ preview: '', data: '' });
    const [caption, setcaption] = useState('');
    const [location, setlocation] = useState('');
    const [MyAllPosts, setMyAllPosts] = useState('');
    const [PostDetail, setPostDetail] = useState({});


    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [uploadshow, setuploadShow] = useState(false);

    const uploadhandleClose = () => setuploadShow(false);
    const uploadhandleShow = () => setuploadShow(true);

    const navigate = useNavigate();

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const showDetail = (post) => {
        setPostDetail(post)
    }

    const handleImageFile = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setImage(img);
    }

    const handleImgUpload = async () => {    
        let formData = new FormData();
        formData.append('file', image.data);

        console.log("After append:", formData);
        const response = axios.post(`${API_BASE_URL}/uploadfile`, formData);
        return response;
    }

    const addPost = async () => {
        if (image.preview === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please upload an image!'
            })
        } else if (caption === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a caption!'
            })
        } else if (location === '') {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter a location!'
            })
        } else {
            setloading(true);
            const imgRes = await handleImgUpload();
            //add validation
            const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.filename}` };
            //write API call for create post request
            await axios.post(`${API_BASE_URL}/createpost`, request, CONFIG_OBJ)
                .then((postResponse) => {
                    if (postResponse.status === 201) {
                        setloading(false);
                        navigate('/posts');
                        Swal.fire({
                            icon: 'success',
                            title: 'Posted Successfully!'
                        })
                    }
                })
                .catch((err) => {
                    setloading(false);
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: err.response.data.Error
                    })
                });

        }
    }

    const getMyPosts = async () => {
        await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setMyAllPosts(response.data.posts);
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.Error
                })
            });
    }

    const deletePost = async (postId) => {
        await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    getMyPosts();
                    setShow(false);
                    Swal.fire({
                        icon: 'success',
                        title: "Post deleted successfully!"
                    });
                }
            })
    }


    useEffect(() => {
        getMyPosts();
    }, []);

    return (
        <div className='container p-lg-5 p-0 pt-4 w-75'>
            <div className='row'>
                <div className='col-6'>
                    <img className='rounded-circle profile' src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile-img' style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                </div>
                <div className='col-6 d-flex gap-lg-5 gap-md-2 gap-2 justify-content-end'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <strong>{MyAllPosts ? MyAllPosts.length : <div className="spinner-border spinner-border-sm text-dark ms-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>}</strong>
                        <p>Posts</p>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <strong>20</strong>
                        <p>Followers</p>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <strong>20</strong>
                        <p>Following</p>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-6 col-sm-12 ps-4 pt-4'>
                    <span>{user.user.username}</span><br />
                    <strong>{user.user.fullname}</strong>
                    <p>Full Stack Developer | Artist</p>
                </div>
                <div className='col-lg-6 col-sm-12 d-flex justify-content-lg-end mt-lg-5 ms-lg-0 ms-2 gap-3 h-100'>
                    <button className=' btn btn-outline-secondary'>Edit Profile</button>
                    <button onClick={uploadhandleShow} className='btn btn-outline-secondary'>Upload Post</button>
                </div>
            </div>
            <div className='row my-3'>
                <hr />
            </div>
            <div>
                <div className='row'>
                    {MyAllPosts ? MyAllPosts.map((post) => {
                        return (
                            <div key={post._id} className='col-4 mb-lg-4 mb-2'>
                                <div onClick={handleShow}>
                                    <img onClick={() => showDetail(post)} className='postcards' src={post.image} alt={post.description} />
                                </div>
                            </div>
                        )
                    })
                        : ""}
                </div>
            </div>



            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Body>
                    <Modal.Header closeButton className='d-lg-none'>
                    </Modal.Header>
                    <div className='row'>
                        <div className='col'>
                            <Carousel>
                                <Carousel.Item>
                                    <img className='carouselcards' src={PostDetail.image} alt='post-img' text="First slide" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className='carouselcards' src='https://images.unsplash.com/photo-1530092285049-1c42085fd395?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='post-img' text="Second slide" />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img className='carouselcards' src='https://images.unsplash.com/photo-1447875569765-2b3db822bec9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='post-img' text="Third slide" />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className='col'>
                            <Modal.Header closeButton className='d-lg-flex d-sm-none'>
                            </Modal.Header>
                            <div className='row mt-3'>
                                <div className="col-2">
                                    <img className='p-2 rounded-circle' src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile-img' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                </div>
                                <div className='col-6 ps-4 pt-1 float-start'>
                                    <strong>{user.user.fullname}</strong><br />
                                    <span>{PostDetail.location}</span>
                                </div>
                                <div className="col-4">
                                    <div className="dropdown">
                                        <div className="btn ms-lg-3 ms-5" data-bs-toggle="dropdown">
                                            <span className="float-end"><i className="fa-solid fa-ellipsis-vertical"></i></span>
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><a href='#home' className="dropdown-item"><i className="fa-solid fa-pen-to-square m-2"></i>Edit Post</a></li>
                                            <li><a onClick={() => deletePost(PostDetail._id)} href='#home' className="dropdown-item"><i className="fa-solid fa-trash-can m-2"></i>Delete Post</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <span className='ms-1' style={{ fontSize: '13px', color: 'gray' }}>2 Hours Ago</span>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <p>{PostDetail.description}</p>
                            </div>
                            <div className='row mt-4'>
                                <div className='col-6 d-flex gap-3 ps-3'>
                                    <i className="fa-regular fa-heart"></i>
                                    <i className="fa-regular fa-comment"></i>
                                    <i className="fa-solid fa-location-arrow"></i>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <strong className='float-end me-2' style={{ fontSize: '15px' }}>{PostDetail.like ? PostDetail.likes.length : "0"} likes</strong>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>



            <Modal size='lg' show={uploadshow} onHide={uploadhandleClose}>
                <Modal.Header closeButton>
                    <strong>Upload Post</strong>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col'>
                            <div className='upload-box'>
                                <input name='file' type='file' accept='.jpeg,.png,.jpg,.gif' onChange={handleImageFile} className='file-upload' />
                                <div>
                                    {image.preview && <img alt='upload-img' src={image.preview} width='150' height='150' />}
                                    <i className="fa-solid fa-cloud-arrow-up fa-2x" style={{ color: "gray" }}></i>
                                    <span>Upload Photo/Video Here</span>
                                </div>
                            </div>
                        </div>
                        <div className='col mt-4'>
                            <div className="form-floating mb-3">
                                <textarea onChange={(e) => setcaption(e.target.value)} type="text" className="form-control" id="floatingTextarea" placeholder="caption" style={{ height: "100px" }} />
                                <label htmlFor="floatingTextarea">Add Caption</label>
                            </div>
                            <div className="form-floating">
                                <input onChange={(e) => setlocation(e.target.value)} type="text" className="form-control" id="floatingPassword" placeholder="location" />
                                <label htmlFor="floatingPassword"><i className="fa-solid fa-location-dot me-2" style={{ color: "gray" }}></i>Add Location</label>
                            </div>
                            <div>
                                <button onClick={addPost} type="submit" className="btn btn-danger float-end" style={{ marginTop: "85px", width: "100px" }}>Post
                                    {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : ""}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default Profile