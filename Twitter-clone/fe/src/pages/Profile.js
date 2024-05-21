import React, { useEffect, useState } from 'react';
import Tweet from '../components/Tweet';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../components/Sidebar';


const Profile = () => {
    const user = useSelector(state => state.userReducer);
    console.log(user);

    const createdAt = new Date(user.user.createdAt);
    const joinedDate = createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const dateOfBirth = new Date(user.user.dateOfBirth);
    const formattedDate = dateOfBirth.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const [updateshow, setupdateShow] = useState(false);

    const updatehandleClose = () => setupdateShow(false);
    const updatehandleShow = () => setupdateShow(true);


    const [updateProfile, setupdateProfile] = useState(false);

    const updateProfileClose = () => setupdateProfile(false);
    const updateProfileShow = () => setupdateProfile(true);

    const [image, setImage] = useState({ preview: '', data: '' });
    const [loading, setloading] = useState();

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
        const response = await axios.post(`${API_BASE_URL}/uploadfile`, formData);
        return response;
    }

    const CONFIG_OBJ = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
    const navigate = useNavigate();

    const [Name, setName] = useState("");
    const [Location, setLocation] = useState("");
    const [Dateofbirth, setDateofbirth] = useState("");

    const updateProfilePic = (e) => {
        e.preventDefault();
        updateProfilePicture();
    }

    const updateProfilePicture = async () => {
        const Id = user.user._id;
        if (image.preview === '') {
            toast.error("Please upload a profile picture!", {
                position: "top-right"
            });
        } else {
            setloading(true);
            const imgRes = await handleImgUpload();
            const request = { profilePicture: `${API_BASE_URL}/files/${imgRes.data.filename}` }
            await axios.put(`${API_BASE_URL}/user/${Id}/profilepicture`, request, CONFIG_OBJ)
                .then((response) => {
                    if (response.status === 200) {
                        setloading(false);
                        toast.success("Profile Picture Updated!", {
                            position: "top-right"
                        });
                    }
                })
                .catch((err) => {
                    setloading(false);
                    toast.error(err.response.data.Error, {
                        position: "top-right"
                    });
                })
        }
    }
    
    const editProf = (e) => {
        e.preventDefault();
        editProfile();
    }
    const editProfile = async () => {
        const Id = user.user._id;
        if (Name === '') {
            toast.error("Please enter a Name!", {
                position: "top-right"
            });
        } else if (Location === '') {
            toast.error("Please enter a Location!", {
                position: "top-right"
            });
        } else if (Dateofbirth === '') {
            toast.error("Please enter Date of Birth!", {
                position: "top-right"
            });
        } else {
            setloading(true);
            //add validation
            const request = { name: Name, location: Location, dateOfBirth: Dateofbirth };
            //write API call for create post request
            await axios.put(`${API_BASE_URL}/user/${Id}`, request, CONFIG_OBJ)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response.data.user);
                        setloading(false);
                        navigate('/');
                        toast.success("Profile Updated!", {
                            position: "top-right"
                        });
                    }
                })
                .catch((err) => {
                    setloading(false);
                    console.log(err);
                    toast.error(err.response.data.Error, {
                        position: "top-right"
                    });
                });

        }
    }

    const [MyAllTweets, setMyAllTweets] = useState('');

    const getMyTweets = async () => {
        const id = user.user._id;
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

    const deleteTweet = async (Id) => {
        await axios.delete(`${API_BASE_URL}/tweet/deletetweet/${Id}`, CONFIG_OBJ)
            .then((response) => {
                if (response.status === 200) {
                    getMyTweets();
                    toast.success("Tweet Deleted Successfully!", {
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
                            <img className='rounded-circle' src={user.user.profilePicture} alt='profile-img' style={{ width: "150px", height: "150px", objectFit: "cover" }} />
                        </div>
                        <div className='col-lg-6 col-sm-12 d-flex justify-content-lg-end mt-lg-5 ms-lg-0 ms-2 gap-3 h-100'>
                            <button onClick={updateProfileShow} className='btn btn-outline-info mt-2' style={{ width: "180px" }}>Upload Profile Photo</button>
                            <button onClick={updatehandleShow} className='btn btn-outline-dark mt-2' style={{ width: "60px" }}>Edit</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='ps-4'>
                            <strong>{user.user.name}</strong><br />
                            <p style={{ color: "gray" }}>{user.user.username}</p>
                            <div style={{ fontSize: "14px", color: "gray" }}><i className="fa-solid fa-location-dot me-1"></i>{user.user.location ? user.user.location : "-"}<i className="fa-solid fa-cake-candles me-1 ms-3"></i>  Born {user.user.dateOfBirth ? formattedDate : "-"}<i className="fa-solid fa-calendar-days ms-3 me-1"></i> Joined {joinedDate} </div>
                            <span style={{ fontSize: "14px", color: "gray" }}><strong style={{ color: "black" }}>{user.user.followers ? user.user.followers.length : 0} </strong>Followers </span>
                            <span style={{ fontSize: "14px", color: "gray" }}><strong style={{ color: "black" }}>{user.user.following ? user.user.following.length : 0} </strong>Following</span>
                        </div>

                    </div>
                    <h5 className='mt-5' style={{ textAlign: "center" }}>Tweets And Replies</h5>
                    {MyAllTweets ? MyAllTweets.map((tweet) => {
                        return (
                            <div key={tweet._id}>
                                <Tweet tweetData={tweet} deleteTweet={deleteTweet} getMyTweets={getMyTweets} />
                            </div>
                        )
                    })
                        : ""}
                </div>
            </div>

            <Modal size='md' show={updateshow} onHide={updatehandleClose}>
                <Modal.Header closeButton>
                    <h3>Edit Profile</h3>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <Form onSubmit={(e) => editProf(e)}>
                            <Form.Group className="mb-1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={(e) => setName(e.target.value)} type="text" />
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>Location</Form.Label>
                                <Form.Control onChange={(e) => setLocation(e.target.value)} type="text" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control onChange={(e) => setDateofbirth(e.target.value)} type="date" />
                            </Form.Group>
                            <div>
                                <button type="submit" className="btn btn-info float-end tweetbtn" style={{ marginTop: "85px", width: "100px", color: "white" }}>Done
                                    {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : ""}
                                </button>
                                <Link onClick={updatehandleClose} className="btn btn-secondary float-end me-2" style={{ marginTop: "85px", width: "100px" }}>Close</Link>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal size='md' show={updateProfile} onHide={updateProfileClose}>
                <Modal.Header closeButton>
                    <h3>Upload Profile Pic</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => updateProfilePic(e)}>
                        <div className='row'>
                            <Form.Group>
                                <Form.Control name='file' accept='.jpeg,.png,.jpg,.gif' onChange={handleImageFile} type="file" />
                            </Form.Group>
                            {image.preview && <div className='d-flex justify-content-center'><img className='post-img mt-2' alt='upload-img' src={image.preview} /></div>}

                        </div>
                        <div className='row'>
                            <div>
                                <div>
                                    <button type="submit" className="btn btn-info float-end tweetbtn" style={{ marginTop: "85px", width: "100px", color: "white" }}>Save
                                        {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : ""}
                                    </button>
                                    <Link onClick={updateProfileClose} className="btn btn-secondary float-end me-2" style={{ marginTop: "85px", width: "100px" }}>Close</Link>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile