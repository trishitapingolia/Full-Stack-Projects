import React, { useEffect, useState } from 'react'
import Tweet from '../components/Tweet'
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Sidebar from '../components/Sidebar';
import { Link, useNavigate } from 'react-router-dom';


const Feed = () => {
  const user = useSelector(state => state.userReducer);
  console.log(user);
  const [uploadshow, setuploadShow] = useState(false);

  const [image, setImage] = useState({ preview: '', data: '' });

  const uploadhandleClose = () => setuploadShow(false);
  const uploadhandleShow = () => setuploadShow(true);

  const [AllTweets, setAllTweets] = useState([]);


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

  const deleteTweet = async (Id) => {
    await axios.delete(`${API_BASE_URL}/tweet/deletetweet/${Id}`, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          getAllTweets();
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


  const getAllTweets = async () => {
    await axios.get(`${API_BASE_URL}/tweet`)
      .then((response) => {
        if (response.status === 200) {
          setAllTweets(response.data.tweets);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.Error, {
          position: "top-right"
        });
      });
  }

  const [content, setcontent] = useState('');
  const [loading, setloading] = useState("");

  const navigate= useNavigate();

  const addTweet = async () => {
    if (content === '') {
      toast.error("Please enter content", {
        position: "top-right"
      });
    }else if (image.preview === '') {
      toast.error("Please enter image", {
        position: "top-right"
      });
    } else {
      setloading(true);
      const imgRes = await handleImgUpload();
      //add validation
      const request = { content: content, image: `${API_BASE_URL}/files/${imgRes.data.filename}` };
      //write API call for create tweet  request
      await axios.post(`${API_BASE_URL}/tweet`, request, CONFIG_OBJ)
        .then((response) => {
          if (response.status === 201) {
            setloading(false);
            navigate("/profile")
            toast.success("Posted Successfully!", {
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

  useEffect(() => {
    getAllTweets();
  }, [])


  return (
    <div className='row'>
      <ToastContainer />
      <Sidebar />
      <div className='col-lg-5 col-8 feed'>
        <div className='mt-2'>
          <strong style={{ fontSize: "25px" }}>Home</strong>
          <button onClick={uploadhandleShow} className='tweetbtn btn ps-5 pe-5 float-end mt-2'>+ Tweet</button>
        </div>
        <hr />
        {AllTweets ? AllTweets.map((tweet) => {
          return (
            <div key={tweet._id}>
              <Tweet tweetData={tweet} deleteTweet={deleteTweet} getAllTweets={getAllTweets} />
            </div>
          )
        })
          : ""}
      </div>




      <Modal size='md' show={uploadshow} onHide={uploadhandleClose}>
        <ToastContainer />
        <Modal.Header closeButton>
          <h3>New Tweet</h3>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='row'>
              <div className="form-floating mb-3">
                <textarea onChange={(e) => setcontent(e.target.value)} type="text" className="form-control" id="floatingTextarea" placeholder="caption" style={{ height: "100px" }} />
                <label className='ms-2' htmlFor="floatingTextarea"> Add your tweet</label>
              </div>
            </div>
            <div className='row'>
              <div className='upload-box'>
                <input name='file' type='file' accept='.jpeg,.png,.jpg,.gif' onChange={handleImageFile} className='file-upload' />
                <div>
                  {image.preview && <div className='d-flex justify-content-center'><img className='post-img mt-2' alt='upload-img' src={image.preview} /></div>}
                </div>
                <div>
                  <Link onClick={addTweet} type="submit" className="btn btn-info float-end tweetbtn" style={{ marginTop: "85px", width: "100px", color: "white" }}>Tweet
                    {loading ? <div className="spinner-border spinner-border-sm text-light ms-2" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div> : ""}
                  </Link>
                  <Link onClick={uploadhandleClose} className="btn btn-secondary float-end me-2" style={{ marginTop: "85px", width: "100px" }}>Close</Link>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Feed