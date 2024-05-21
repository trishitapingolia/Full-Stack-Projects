import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import axios from 'axios';

const Posts = () => {

  const [AllPosts, setAllPosts] = useState([]);

  const deletePost = async (postId) => {
    await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ)
      .then((response) => {
        if (response.status === 200) {
          getAllPosts();
          Swal.fire({
            icon: 'success',
            title: "Post deleted successfully!"
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.Error
        })
      });
  }

  const getAllPosts = async () => {
    await axios.get(`${API_BASE_URL}/allposts`)
      .then((response) => {
        if (response.status === 200) {
          setAllPosts(response.data.posts);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: err.response.data.Error
        })
      });
  }

  const CONFIG_OBJ = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}

  useEffect(() => {
    getAllPosts();
  }, [])

  return (
    <div>
      <div>
        {/* style={{ backgroundColor: '#FFF6FC' }} */}
        <div className='container pt-5'>
          <div className='row'>
            {AllPosts?AllPosts.map((post) => {
              return (
                <div key={post._id} className='col-lg-4 p-3 col-sm-12'>
                  <Card postData={post} deletePost={deletePost} getAllPosts={getAllPosts}/>
                </div>
              )
            })
            :""}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts