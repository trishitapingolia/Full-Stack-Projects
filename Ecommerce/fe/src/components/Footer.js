import React from 'react'
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="container-fluid bg-dark text-center p-2">
      <section>
        <div className="container text-center text-md-start mt-5 bg-dark">
          <div className="row mt-3 text-center">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <Link to="/women/w-all" className="link d-block" id="linksheading">Women</Link>
              <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: 'white', height: '2px' }} />
              <Link to="/women/w-shoes" className="link d-block" id="links">Shoes</Link>
              <Link to="/women/w-heels" className="link d-block" id="links">Heels</Link>
              <Link to="/women/w-boots" className="link d-block" id="links">Boots</Link>
              <Link to="/women/w-flats" className="link d-block" id="links">Flats</Link>
              <Link to="/women/w-sneakers" className="link d-block" id="links">Sneakers</Link>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <Link to="/men/m-all" className="link d-block" id="linksheading">Men</Link>
              <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: 'white', height: '2px' }} />
              <Link to="/men/m-shoes" className="link d-block" id="links">Shoes</Link>
              <Link to="/men/m-loafers" className="link d-block" id="links">Loafers</Link>
              <Link to="/men/m-boots" className="link d-block" id="links">Boots</Link>
              <Link to="/men/m-flats" className="link d-block" id="links">Flats</Link>
              <Link to="/men/m-sneakers" className="link d-block" id="links">Sneakers</Link>
            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-1">
              <Link to="/kids" className="link d-block" id="linksheading">Kids</Link>
              <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: 'white', height: '2px' }} />
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <div className="link d-block" id="linksheading">Links</div>
              <hr className="mb-2 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: 'white', height: '2px' }} />
              <Link to="/home" className="link d-block" id="links">Home</Link>
              <Link to="/login" className="link d-block" id="links">Login</Link>
              <Link to="/contactus" className="link d-block" id="links">Contact</Link>
            </div>
          </div>
        </div>
      </section>
      <hr style={{ color: 'white' }} />
      <h6 style={{ color: 'white' }}>Copyright &copy; FootSteps 2023-2024</h6>
    </div>
  )
}

export default Footer