import React, { useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './ShowDetail.css'
import { db } from '../../Firebase/FirebaseConfig'

const ShowDetails = () => {

    const { orderId } = useParams()
    const [orderData, setOrderData] = useState([]);

    const getOrderData = async () => {
        const docRef = doc(db, "UserOrders", orderId);
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setOrderData(docSnap.data())
        }
        else {
            alert("No data found for particular order no.")
        }
    }

    useEffect(() => {
        getOrderData();
    }, [])

    return (
        <div>
            <Navbar />
            <h2 style={{ marginLeft: "20px", marginBottom: "80px", color: '#4caf50' }}>Showing Details For Order {orderId}</h2>
            <div className='detailDiv'>
                <div>
                    <p>Customer Name</p>
                    <p>{orderData.orderUserName}</p>
                </div>
                <div>
                    <p>Customer Address</p>
                    <p>Not Applicable</p>
                </div>
                <div>
                    <p>Order Cost</p>
                    <p>{orderData.orderCost}</p>
                </div>
                <div>
                    <p>Payment Status</p>
                    <p>{orderData.paymentStatus}</p>
                </div>
            </div>
        </div>
    )
}

export default ShowDetails