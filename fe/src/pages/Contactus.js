import React from 'react'

const Contactus = () => {
    return (
        <div>
            <div className="container-fluid contactus">
                <div className="row">
                    <h2 style={{ textAlign: 'center', marginTop: '40px', marginBottom: '40px', color: 'rgb(75,75,75)', fontWeight: 'bold' }}>CONTACT US</h2>
                    <div className="col-lg-6 col-md-6 col-12 d-flex mb-5">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img className="image" src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="60%" alt="img" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 mb-5">
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <form name="contact-form">
                                <h6>Name:</h6>
                                <input type="text" placeholder="Enter your name" size="40" name="name" /><br />
                                <h6>E-mail:</h6>
                                <input type="email" placeholder="Enter your E-mail" size="40" name="E-mail" /><br />
                                <h6>Message:</h6>
                                <textarea cols="44" rows="4" placeholder="Enter your message"></textarea><br />
                                <button className="btn btn-dark" style={{ width: '340px' }}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contactus