import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../images/Logo.PNG';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';

// Functional component for the top navigation bar
function TopNavbar() {
    
    const user = useSelector(state=>state.userReducer);
    // console.log(user);
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({type: 'LOGIN_ERROR'});
        navigate('/login');
    }
    

    return (
        <Navbar expand="lg" className="bg-body-white shadow-sm">
            <Container fluid>
                <Navbar.Brand href="#"><img src={Logo} style={{ width: "160px" }} alt='mobile-logo' /></Navbar.Brand>
                <Form className="d-flex justify-content-end">
                    <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 d-none d-lg-flex"
                        aria-label="Search"
                        id='search'
                    />
                    <div className='me-lg-5 me-3 mt-lg-2 gap-3 ms-4 d-flex'>
                        <NavLink className='text-dark d-lg-none'><i className="fa-solid fa-magnifying-glass fa-lg"></i></NavLink>
                        <NavLink to={'/posts'} className='text-dark'><i className="fa-solid fa-house fa-lg"></i></NavLink>
                        {user.user._id?<NavLink className='text-dark'><i className="fa-regular fa-heart fa-lg"></i></NavLink>:''}
                        <div className="dropstart">
                            {user.user._id?<><div data-bs-toggle="dropdown">
                                <img className='rounded-circle' src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile-img' style={{ width: "22px", height: "22px", objectFit: "cover", cursor:"pointer" }} />
                            </div>
                            <ul className="dropdown-menu">
                                <li><Link to={'/myprofile'} className="dropdown-item">My Profile</Link></li>
                                <li><Link to={'/login'} onClick={()=>logout()} className="dropdown-item">Log Out</Link></li>
                            </ul></>:''}    
                        </div>
                    </div>
                </Form>
            </Container>
        </Navbar>
    );
}

export default TopNavbar;