import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
  const user = useSelector(state => state.userReducer);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGIN_ERROR' });
    navigate('/login');
  }
  return (
    <div className='col-4'>
      <nav className="navbar navbar-expand-lg flex-column float-end me-3">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav flex-column">
              <li className="nav-item mt-3">
                <i  className="fa-brands fa-twitter fa-2xl" style={{ color: " #74C0FC" }}></i>
              </li>
              <li className="nav-item">
                <Link style={{fontSize:"14px"}} className="nav-link active mt-3" aria-current="page" to="/"><i className="fa-solid fa-house me-2"></i>Home</Link>
              </li>
              <li className="nav-item">
                <Link style={{fontSize:"14px"}} className="nav-link" to="/"><i className="fa-solid fa-magnifying-glass me-2"></i>Search</Link>
              </li>
              <li className="nav-item">
                <Link style={{fontSize:"14px"}} className="nav-link" to="/profile"><i className="fa-solid fa-user me-2"></i>Profile</Link>
              </li>
              {user.user._id?<li className="nav-item">
                <Link onClick={logout} style={{fontSize:"14px"}} className="nav-link" to="/login"><i className="fa-solid fa-right-from-bracket me-2"></i>Logout</Link>
              </li>:""}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar