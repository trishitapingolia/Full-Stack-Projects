import AllProducts from './pages/AllProducts';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Kids from './pages/Kids';
import Contactus from './pages/Contactus';
import Women from './pages/women/Women';
import Men from './pages/men/Men';
import WShoes from './pages/women/WShoes';
import WHeels from './pages/women/WHeels';
import WSneakers from './pages/women/WSneakers';
import WFlats from './pages/women/WFlats';
import WBoots from './pages/women/WBoots';
import MShoes from './pages/men/MShoes';
import MLoafers from './pages/men/MLoafers';
import MSneakers from './pages/men/MSneakers';
import MFlats from './pages/men/MFlats';
import MBoots from './pages/men/MBoots';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/login';
import Signup from './pages/Signup';
import CartPage from './pages/CartPage';
import Shipping from './pages/Shipping';
import Admin from './pages/Admin';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PaymentMode from './pages/PaymentMode';
import Preview from './pages/Preview';

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
        <Route path='/' element={<Home />}></Route>
        <Route path='/allproducts' element={<AllProducts />}></Route>
        <Route path='/women/w-all' element={<Women />}></Route>
        <Route path='/men/m-all' element={<Men />}></Route>
        <Route path='/kids' element={<Kids />}></Route>
        <Route path='/contactus' element={<Contactus />}></Route>
        <Route path='/women/w-shoes' element={<WShoes />}></Route>
        <Route path='/women/w-heels' element={<WHeels />}></Route>
        <Route path='/women/w-sneakers' element={<WSneakers />}></Route>
        <Route path='/women/w-flats' element={<WFlats />}></Route>
        <Route path='/women/w-boots' element={<WBoots />}></Route>
        <Route path='/men/m-shoes' element={<MShoes />}></Route>
        <Route path='/men/m-loafers' element={<MLoafers />}></Route>
        <Route path='/men/m-sneakers' element={<MSneakers />}></Route>
        <Route path='/men/m-flats' element={<MFlats />}></Route>
        <Route path='/men/m-boots' element={<MBoots />}></Route>
        <Route path='/productdetail/:productId' element={<ProductPage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/cart' element={<CartPage />}></Route>
        <Route path='/shipping/:orderId' element={<Shipping />}></Route>
        <Route path='/payment/:orderId' element={<PaymentMode />}></Route>
        <Route path='/preview/:orderId' element={<Preview />}></Route>
        <Route path='/admin' element={<Admin />}></Route>
      </Routes>
    )

  }
  return (
    <>
    <Router>
    <Header/>
      <DynamicRouting/>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
