import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <div className='container'>
            <div className='leftNav'>
                <Link to='/' className='link'>
                    <h2>Foodistan</h2>
                </Link>
            </div>
            <div className='rightNav'>
                <Link to='/orders' className='link'>
                    <p>Orders</p>
                </Link>
                <Link to='/addFood' className='link'>
                    <p>Add Food</p>
                </Link>
            </div>
        </div>
    )
}

export default Navbar