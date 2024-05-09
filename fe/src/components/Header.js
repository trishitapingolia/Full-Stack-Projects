import React from 'react'
import Logo from '../images/Logo.png';
import '../styles/Header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = useSelector(state => state.userReducer);
  console.log(user);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('items');
    dispatch({ type: 'LOGIN_ERROR' });
    navigate('/login');
  }
  return (
    <div>
      <nav className="navbar bg-body-tertiary" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <a className="navbar-brand" to="/">
            <img src={Logo} className="logo" alt="logo" width="280" />
          </a>
          {/* Search bar for large screens */}
          <form className="d-lg-flex d-none d-lg-block">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ borderBottomLeftRadius: '20px' }} />
            <button className="btn btn-dark searchbtn" type="submit" style={{ borderTopRightRadius: '20px' }}>Search</button>
          </form>
          {/* Login form */}
          <form className="d-flex">
            {user && user.user.isAdmin===true ? <Link to="/admin" className="btn btn-dark lgn-btn me-3">Admin Dashboard</Link> :""}
            {!user.user._id ? <Link to={"/login"} className="btn btn-dark lgn-btn me-3">Login</Link> : <button onClick={logout} className="btn btn-dark lgn-btn me-3">Logout</button>}
            {/* Cart icon */}
            <Link className="nav-link" to="/cart">
              <i className="fa-solid fa-bag-shopping fa-xl" style={{ color: 'black' }}></i>
            </Link>
          </form>
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          {/* Toggler */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ textAlign: 'center' }}>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allproducts">All Products</Link>
              </li>
              {/* Dropdown for Women */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarScrollingDropdown1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Women
                </Link>
                {/* Links */}
                <ul className="dropdown-menu dropdown-menu-hover" aria-labelledby="navbarScrollingDropdown1">
                  <li><Link className="dropdown-item" to="/women/w-all">All</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/women/w-shoes">Shoes</Link></li>
                  <li><Link className="dropdown-item" to="/women/w-heels">Heels</Link></li>
                  <li><Link className="dropdown-item" to="/women/w-boots">Boots</Link></li>
                  <li><Link className="dropdown-item" to="/women/w-flats">Flats</Link></li>
                  <li><Link className="dropdown-item" to="/women/w-sneakers">Sneakers</Link></li>
                </ul>
              </li>
              {/* Dropdown for Men */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarScrollingDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Men
                </Link>
                {/* Links */}
                <ul className="dropdown-menu dropdown-menu-hover" aria-labelledby="navbarScrollingDropdown2">
                  <li><Link className="dropdown-item" to="/men/m-all">All</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/men/m-shoes">Shoes</Link></li>
                  <li><Link className="dropdown-item" to="/men/m-loafers">Loafers</Link></li>
                  <li><Link className="dropdown-item" to="/men/m-boots">Boots</Link></li>
                  <li><Link className="dropdown-item" to="/men/m-flats">Flats</Link></li>
                  <li><Link className="dropdown-item" to="/men/m-sneakers">Sneakers</Link></li>
                </ul>
              </li>
              {/* Other links */}
              <li className="nav-item">
                <Link className="nav-link" to="/kids">Kids</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contactus">Contact</Link>
              </li>
            </ul>
            {/* Search bar for small screens */}
            <form className="d-flex d-lg-none">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ borderBottomLeftRadius: '20px' }} name="Search" />
              <Link className="btn btn-dark border-white" type="submit" style={{ borderTopRightRadius: '20px' }}>Search</Link>
            </form>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header