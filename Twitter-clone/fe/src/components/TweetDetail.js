import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import Tweet from './Tweet';

const TweetDetail = (props) => {
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </a>
    ));
    return (
        <div>
            <Tweet/>
            <div className='commentBox'>
                <div className='row'>
                    <div className="col-1">
                        <img className='p-2 rounded-circle' src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='profile-img' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                    </div>
                    <div className='col-7 ps-4 mt-2 float-start'>
                        <div>
                            <strong>Trishita</strong><span className='ms-2' style={{ color: "gray" }}>trish@123</span>
                            <span className='ps-3' style={{ fontSize: "14px", color: "gray" }}>- Sun 23 JAN 2024</span>
                        </div>
                        <div>
                            <span className='ms-1' style={{ fontSize: '16px' }}>Nice pic</span>
                        </div>
                    </div>
                    <div className='col-4'>
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle}>
                                <span style={{ position: "absolute", left: "160px" }}><i style={{ cursor: "pointer", color: "black" }} className="fa-solid fa-ellipsis-vertical"></i></span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Delete Comment</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='mt-4'>
                        <div className='d-flex gap-3 ps-3'>
                            <i style={{ cursor: "pointer" }} className="fa-regular fa-heart"></i>
                            <div className="dropdown">
                                <div data-bs-toggle="dropdown">
                                    <i style={{ cursor: "pointer", position: "absolute", bottom: "1px" }} className="fa-regular fa-comment"></i>
                                </div>
                                <ul className="dropdown-menu mt-1">
                                    <li>
                                        <form>
                                            <div style={{ width: "500px" }} className="input-group m-2">
                                                <input type="text" className="form-control" placeholder="Add your comment" />
                                                <button type='submit' className="btn btn-outline-secondary">Comment</button>
                                            </div>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                            <i className="fa-solid fa-retweet ms-3"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TweetDetail