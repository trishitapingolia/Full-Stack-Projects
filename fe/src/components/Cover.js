import '../styles/Home.css';
import {Link} from 'react-router-dom'

function Cover() {
  return (
    <div className="bg-img">
      <div className="heading">
        <h1 style={{ fontSize: '50px', fontFamily: 'Courier New, Courier, monospace', fontWeight: 'bold' }}>FootSteps.</h1>
        <h3 style={{ fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontSize: '25px' }}>Where Style Meets Comfort, Every Step Tells a Different Story</h3>
        <Link to='/allproducts' className="btn btn-light w-50 buy-btn" style={{ fontSize: 'large' }}>Buy Now!</Link>
      </div>
    </div>
  );
}

export default Cover;