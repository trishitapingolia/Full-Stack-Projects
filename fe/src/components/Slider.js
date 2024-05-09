import React from 'react'

const Slider = () => {
  return (
    <div>
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', color: 'rgb(74, 74, 74)', marginTop: '50px' }}>FEATURED PRODUCTS</h2>
      <p style={{ textAlign: 'center', color: 'rgb(74, 74, 74)', fontFamily: 'monospace' }}>GET THEM BEFORE THEY ARE GONE!!!</p>
      {/* Carousel for featured products */}
      <div id="carouselInterval" className="carousel slide" data-bs-ride="carousel">
        <div className="container-fluid carousel-inner p-4">
          {/* <!-- First carousel item --> */}
          <div className="carousel-item active" data-bs-interval="10000">
            <div className="card-wrapper d-flex mb-5">
              <div className="card text-center m-1 cards" id="w-sneakers">
                <img src="https://images.unsplash.com/photo-1622760806364-5ccac8096b59?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Women color-blocked sneakers</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 2800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1"></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="w-sneakers">
                <img src="https://images.unsplash.com/photo-1622760806364-5ccac8096b59?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Women color-blocked sneakers</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 2800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1"></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="third">
                <img src="https://images.unsplash.com/photo-1622760806364-5ccac8096b59?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Women color-blocked sneakers</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 2800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1"></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="forth">
                <img src="https://images.unsplash.com/photo-1622760806364-5ccac8096b59?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Women color-blocked sneakers</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 2800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1"></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
            </div>
          </div>
          {/* <!-- Second carousel item --> */}
          <div className="carousel-item" data-bs-interval="2000">
            <div className="card-wrapper d-flex mb-5">
              <div className="card text-center m-1 cards" id="w-shoes">
                <img src="https://images.unsplash.com/photo-1612181346599-a6bfbd67be86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Air Jordon</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 3200/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="w-shoes">
                <img src="https://images.unsplash.com/photo-1612181346599-a6bfbd67be86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Air Jordon</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 3200/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="third">
                <img src="https://images.unsplash.com/photo-1612181346599-a6bfbd67be86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Air Jordon</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 3200/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="forth">
                <img src="https://images.unsplash.com/photo-1612181346599-a6bfbd67be86?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Air Jordon</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 3200/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
            </div>
          </div>
          {/* <!-- Third carousel item --> */}
          <div className="carousel-item">
            <div className="card-wrapper d-flex mb-5">
              <div className="card text-center m-1 cards" id="w-boots">
                <img src="https://images.unsplash.com/photo-1609336348831-959d5926d686?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Snake print leather Boots</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 4800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="w-boots">
                <img src="https://images.unsplash.com/photo-1609336348831-959d5926d686?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Snake print leather Boots</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 4800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="third">
                <img src="https://images.unsplash.com/photo-1609336348831-959d5926d686?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Snake print leather Boots</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 4800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
              <div className="card text-center m-1 cards" id="forth">
                <img src="https://images.unsplash.com/photo-1609336348831-959d5926d686?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="card-img-top" alt="card-img"/>
                  <div className="card-body">
                    <h6 className="card-title">Snake print leather Boots</h6>
                    <p className="card-text" style={{fontSize: "x-small"}}>Lorem ipsum, dolor sit amet consectetur adipisicing.</p>
                    <h6>&#x20b9; 4800/-</h6>
                    <a href="/" className="btn btn-outline-dark">
                      <i className="fa-solid fa-bag-shopping fa-sm p-1" ></i>
                      Add to Bag
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Carousel navigation buttons --> */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}

export default Slider