import './App.css';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import UserProfile from './pages/userProfile';

function App() {

  function DynamicRouting() {
    const user = useSelector(state => state.userReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      const UserData = JSON.parse(localStorage.getItem(user));
      if (UserData){
        dispatch({type:"LOGIN_SUCCESS",payload:UserData});
        navigate('/')
      }else{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({type: 'LOGIN_ERROR'});
        navigate('/login');
      }
    },[]);

    return(
      <Routes>
        <Route exact path='/' element={<Feed />}></Route>
        <Route exact path='/profile' element={<Profile />}></Route>
        <Route exact path='/userprofile/:userId' element={<UserProfile />}></Route>
        <Route exact path='/register' element={<Register />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
      </Routes>
    )

  }



  return (
    <Router>
      <DynamicRouting/>
    </Router>
  );
}

export default App;
