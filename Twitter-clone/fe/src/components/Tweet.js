import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
// import TweetDetail from './TweetDetail';


const Tweet = (props) => {
    const user = useSelector(state => state.userReducer);

    const createdAt = new Date(props.tweetData.createdAt);
    const CreatedAt = createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href="/"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }

    const [like, setlike] = useState(false);

    const checkLike = (Id) => {
        if (like === false) {
            likeTweet(Id);
        } else {
            unlikeTweet(Id);
        }
    }

    const likeTweet = async (Id) => {
        const request = {tweetId: Id};
        await axios.put(`${API_BASE_URL}/tweet/${Id}/like`, request, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setlike(true);
                    props.getAllTweets();
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }

    const unlikeTweet = async (Id) => {
        const request = {tweetId: Id};
        await axios.put(`${API_BASE_URL}/tweet/${Id}/dislike`, request, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setlike(false);
                    props.getAllTweets();
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }

    const navigate = useNavigate();

    const watchProfile = () => {
        if (props.tweetData.author._id !== user.user._id){
            navigate(`/userprofile/${props.tweetData.author._id}`);
        }
    }


    return (
        <div className='tweetcard'>
            <ToastContainer />
            <div className='d-flex'>
                <div className="col-1">
                    <img className='p-2 rounded-circle' onClick={watchProfile} src={props.tweetData.author.profilePicture} alt='profile-img' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                </div>
                <div className='col-9 mt-2 float-start username'>
                    <strong>{props.tweetData.author.name}</strong>
                    <span style={{ fontSize: "14px", color: "gray" }}>- {CreatedAt} </span>
                </div>
                <Dropdown>
                    {props.tweetData.author._id === user.user._id ? 
                    <><Dropdown.Toggle as={CustomToggle}>
                        <span id='editicon'><i style={{ cursor: "pointer", color: "black" }} className="fa-solid fa-ellipsis-vertical editicon"></i></span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => props.deleteTweet(props.tweetData._id)}>Delete Tweet</Dropdown.Item> 
                    </Dropdown.Menu>
                    </>: ""}
                </Dropdown>
            </div>
            <div className='row'>
                <div className='mt-3 ms-3'>{props.tweetData.content}</div>
                <div className='container d-flex justify-content-center pt-2'>
                    <img className='post-img' src={props.tweetData.image} alt="tweetimg" />
                </div>
            </div>
            <div className='mt-4'>
                <div className='d-flex gap-3 ps-3'>
                    {!like ? <i style={{ cursor: "pointer" }} onClick={() => checkLike(props.tweetData._id)} className="fa-regular fa-heart"></i> : <i style={{ cursor: "pointer" }} onClick={() => checkLike(props.tweetData._id)} className="fa-solid fa-heart"></i>}
                    <div className="dropdown">
                        <div data-bs-toggle="dropdown">
                            <i style={{ cursor: "pointer", position: "absolute", bottom: "1px", }} className="fa-regular fa-comment"></i>
                        </div>
                        <ul className="dropdown-menu">
                            <li>
                                <form>
                                    <div style={{ width: "500px" }} className="input-group m-2">
                                        <input type="text" className="form-control" placeholder="Add your comment" />
                                        <button type='submit' className="btn btn-outline-secondary">Comment</button>
                                    </div>
                                </form>
                            </li>
                        </ul>
                    </div>
                    <i className="fa-solid fa-retweet ms-3"></i>
                </div>
            </div>
        </div>
    )
}

export default Tweet