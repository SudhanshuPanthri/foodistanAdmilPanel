import React from 'react'
import { Link } from 'react-router-dom'
import './HomeScreen.css'

const HomeScreen = () => {
    return (
        <div className='parent'>
            <div style={{ marginBottom: 50 }}>
                <h1>Foodistan</h1>
            </div>
            <div className='linkContainer'>
                <Link to='/orders' className='link'>
                    <h2>Orders</h2>
                </Link>
                <Link to='/addFood' className='link'>
                    <h2>Add Food</h2>
                </Link>
            </div>
        </div>
    )
}

export default HomeScreen