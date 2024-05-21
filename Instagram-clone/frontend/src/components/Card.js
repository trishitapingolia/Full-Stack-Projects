import React, { useState } from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const Card = (props) => {
    const user = useSelector(state => state.userReducer);
    const [like, setlike] = useState(false);
    const [comment, setComment] = useState("");
    const [ViewComments, setViewComments] = useState("");

    // console.log(user.user._id);
    // console.log(props.postData.author._id);
    const checkLike = (postId) => {
        if (like === false) {
            likePost(postId);
        } else {
            unlikePost(postId);
        }
    }



    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const likePost = async (postId) => {
        const request = { postId: postId };
        await axios.put(`${API_BASE_URL}/like`, request, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setlike(true);
                    props.getAllPosts();
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.Error
                })
            });
    }

    const unlikePost = async (postId) => {
        const request = { postId: postId };
        await axios.put(`${API_BASE_URL}/unlike`, request, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setlike(false);
                    props.getAllPosts();
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.Error
                })
            });
    }

    const commentPost = async (postId) => {
        const request = { "postId": postId, "commentText": comment };
        await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    props.getAllPosts();
                }
                setComment("");
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.Error
                })
            });
    }

    const manageViewComments=()=>{
        setViewComments(prevViewComments => !prevViewComments);
    }

    return (
        <div>
            <div className="card shadow-sm">
                <div className="card-body px-2">
                    <div className='d-flex'>
                        <div className="col-2">
                            <img className='p-2 rounded-circle' src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile-img' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                        </div>
                        <div className='col-6 float-start'>
                            <strong>{props.postData.author.fullName}</strong><br />
                            <span>{props.postData.location}</span>
                        </div>
                        <div className="dropdown">
                            {props.postData.author._id === user.user._id ? <><div data-bs-toggle="dropdown" className="col-4">
                                <span style={{ position: "absolute", left: "100px" }}><i style={{ cursor: "pointer" }} className="fa-solid fa-ellipsis-vertical"></i></span>
                            </div>
                                <ul className="dropdown-menu">
                                    <li><Link onClick={() => props.deletePost(props.postData._id)} className="dropdown-item">Delete Post</Link></li>
                                </ul>
                            </> : ''}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 container d-flex justify-content-center pt-2'>
                            <img className='post-img' src={props.postData.image} alt={props.postData.description} />
                        </div>
                        <div className='ms-3 mt-3'>{props.postData.description}</div>
                    </div>
                    <div className='row mt-4'>
                        <div className='col-6 d-flex gap-3 ps-3'>
                            {!like ? <i style={{ cursor: "pointer" }} onClick={() => checkLike(props.postData._id)} className="fa-regular fa-heart"></i> : <i style={{ cursor: "pointer" }} onClick={() => checkLike(props.postData._id)} className="fa-solid fa-heart"></i>}
                            <div className="dropdown">
                                <div data-bs-toggle="dropdown" className="col-4">
                                    <i style={{ cursor: "pointer", position: "absolute", bottom: "6px", }} className="fa-regular fa-comment"></i>
                                </div>
                                <ul className="dropdown-menu">
                                    <li>
                                        <form>
                                            <div style={{ width: "500px" }} className="input-group m-2">
                                                <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="form-control" placeholder="Add your comment" />
                                                <button onClick={() => commentPost(props.postData._id)} type='submit' className="btn btn-outline-secondary">Comment</button>
                                            </div>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                            <i className="fa-solid fa-location-arrow ms-3"></i>
                        </div>
                        <div className='col-6'>
                            <strong className='float-end me-2' style={{ fontSize: '15px' }}>{props.postData.likes.length} likes</strong>
                        </div>
                    </div>
                    <div style={{color:"gray",cursor: "pointer"}} onClick={manageViewComments} className='ms-1'>View all comments</div>
                    {ViewComments?<div className='mt-2 dropdown'>
                        {props.postData.comments.map((comment) => {
                            return (
                                <div key={comment._id} className='row'>
                                    <div className='col'>
                                        <span className='ms-1' style={{ fontSize: '16px' }}>{comment.commentText}</span>
                                    </div>
                                    <div className='col'>
                                        <div style={{ fontSize: "13px", color: "gray" }} className='float-end me-1'>{comment.commentBy.fullName}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>:""}
                    <div className='row'>
                        <div className='col'>
                            <span className='ms-1' style={{ fontSize: '13px', color: 'gray' }}>2 Hours Ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card