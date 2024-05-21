// Importing necessary modules
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Importing components and pages
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Posts from './pages/Posts'
import TopNavbar from './components/Navbar'
import Profile from './pages/Profile'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {

  function DynamicRouting() {
    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      const UserData = JSON.parse(localStorage.getItem(user));
      if (UserData){
        dispatch({type:"LOGIN_SUCCESS",payload:UserData});
        navigate('/posts')
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({type: 'LOGIN_ERROR'});
        navigate('/login');
      }
    },[]);

    return(
      <Routes>
        <Route exact path='/' element={<Posts />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/signup' element={<SignUp />}></Route>
        <Route exact path='/posts' element={<Posts />}></Route>
        <Route exact path='/myprofile' element={<Profile />}></Route>
      </Routes>
    )

  }


  return (
    // Using BrowserRouter for routing
    <Router >
      <TopNavbar />
      <DynamicRouting/>
    </Router>
  )
}


export default App
