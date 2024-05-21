import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../components/Sidebar';
import { useParams } from 'react-router-dom';


const UserProfile = () => {
    const user = useSelector(state => state.userReducer);
    const { userId } = useParams();
    console.log(user);

    const createdAt = new Date(user.user.createdAt);
    const joinedDate = createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });



    const dateOfBirth = new Date(user.user.dateOfBirth);
    const formattedDate = dateOfBirth.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });


    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }


    const [MyAllTweets, setMyAllTweets] = useState('');

    const [Data, setData] = useState("");
    console.log("Data"+Data);

    const getUser = async()=>{
        const id = userId;
        await axios.get(`${API_BASE_URL}/user/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setData(response.data.result);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }

    const getMyTweets = async () => {
        const id = userId;
        await axios.get(`${API_BASE_URL}/tweet/${id}/tweets`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setMyAllTweets(response.data.tweets);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }

    const [Followed, setFollowed] = useState(false);

    const checkfollow=()=>{
        if(Followed===false){
            follow();
        }else{
            unfollow();
        }
    }

    const follow = async () => {
        const id = userId;
        await axios.put(`${API_BASE_URL}/user/${id}/follow`, {}, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setFollowed(true);
                    toast.success("Followed", {
                        position: "top-right"
                    });
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }

    const unfollow = async () => {
        const id = userId;
        await axios.put(`${API_BASE_URL}/user/${id}/unfollow`, {}, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    setFollowed(false);
                    toast.success("UnFollowed", {
                        position: "top-right"
                    });
                }
            })
            .catch((err) => {
                toast.error(err.response.data.Error, {
                    position: "top-right"
                });
            });
    }


    useEffect(() => {
        getMyTweets();
        getUser();
    }, []);


    return (
        <div className='row'>
            <ToastContainer />
            <Sidebar />
            <div className='col-lg-5 col-8 feed'>
                <div className='p-lg-2 p-0 pt-4'>
                    <div className='banner'>

                    </div>
                    <div className='row profile'>
                        <div className='col-6'>
                            <img className='rounded-circle' src={Data.profilePicture} alt='profile-img' style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                        </div>
                        <div className='col-lg-6 col-sm-12 d-flex justify-content-lg-end mt-lg-5 ms-lg-0 ms-2 gap-3 h-100'>
                            {!Followed?<button onClick={checkfollow} className='btn btn-outline-info mt-2' style={{ width: "180px" }}>Follow</button>:<button onClick={checkfollow} className='btn btn-outline-info mt-2' style={{ width: "180px" }}>UnFollow</button>}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='ps-4'>
                            <strong>{Data.name}</strong><br />
                            <p style={{ color: "gray" }}>{Data.username}</p>
                            <div style={{ fontSize: "14px", color: "gray" }}><i className="fa-solid fa-location-dot me-1"></i>{Data.location ? Data.location : "-"}<i className="fa-solid fa-cake-candles me-1 ms-3"></i>  Born {Data.dateOfBirth ? formattedDate : "-"}<i className="fa-solid fa-calendar-days ms-3 me-1"></i> Joined {joinedDate} </div>
                            <span style={{ fontSize: "14px", color: "gray" }}><strong style={{ color: "black" }}>{Data.followers ? Data.followers.length : 0} </strong>Followers </span>
                            <span style={{ fontSize: "14px", color: "gray" }}><strong style={{ color: "black" }}>{Data.following ? Data.following.length : 0} </strong>Following</span>
                        </div>

                    </div>
                    <h5 className='mt-5' style={{ textAlign: "center" }}>Tweets And Replies</h5>
                    {MyAllTweets ? MyAllTweets.map((tweet) => {
                        return (
                            <div key={tweet._id}>
                                <Tweet tweetData={tweet} getMyTweets={getMyTweets} />
                            </div>
                        )
                    })
                        : ""}
                </div>
            </div>

        </div>
    )
}

export default UserProfile