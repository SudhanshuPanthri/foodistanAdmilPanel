import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import './OrderSection.css'
import { db } from '../../Firebase/FirebaseConfig'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

const OrderSection = () => {

    const [allOrders, setAllOrders] = useState([]);
    const [allOrderStatus, setAllOrderStatus] = useState('')
    const [searchParam, setSearchParam] = useState('');

    const getData = async () => {
        setAllOrders([]);
        const querySnapshot = await getDocs(collection(db, 'UserOrders'))
        querySnapshot.forEach((doc) => {
            setAllOrders((prev) => [...prev, doc.data()])
        })
    }

    useEffect(() => {
        getData();
    }, [])

    const changeOrderStatus = (orderData, status) => {
        const docRef = doc(db, "UserOrders", orderData.orderId);
        const data = {
            ...orderData,
            orderStaus: status
        }
        setDoc(docRef, data).then(() => {
            alert("Document Updated")
        }).catch((error) => {
            alert(error);
        })
        getData();
    }

    const deliveryPersonName = (orderData, name) => {
        const docRef = doc(db, "UserOrders", orderData.orderId);
        const data = {
            ...orderData,
            deliveryPerson: name
        }
        setDoc(docRef, data).then(() => {
            alert("Document Updated")
        }).catch((error) => {
            alert(error);
        })
        getData();
    }

    const deliveryPersonNumber = (orderData, number) => {
        const docRef = doc(db, "UserOrders", orderData.orderId);
        const data = {
            ...orderData,
            deliveryPersonNo: number
        }
        setDoc(docRef, data).then(() => {
            alert("Document Updated")
        }).catch((error) => {
            alert(error);
        })
        getData();
    }

    return (
        <div>
            <Navbar />
            <h2 style={{ marginLeft: '20px' }}>Order section</h2>
            <div>
                <div className='searchContainer'>
                    <div style={{ width: '40%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="text" className='search' placeholder='Search by order ID or delivery status' onChange={(e) => setSearchParam(e.target.value)} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginRight: '40px' }}>
                        <p style={{ marginRight: '20px' }}>Sort by Order Status</p>
                        <select onChange={(e) => setAllOrderStatus(e.target.value)}>
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="ontheway">On the way</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
                <div className='orderStatus'>
                    <h2 style={{ marginLeft: '20px' }}>Order Status</h2>
                    <div className='contentContainer'>
                        <div className='upper'>
                            <div>
                                <p className="orderInfo">Order Id</p>
                            </div>
                            <div>
                                <p className="orderInfo">Paid</p>
                            </div>
                            <div>
                                <p className="orderInfo">Delivery Status</p>
                            </div>
                            <div>
                                <p className="orderInfo">Delivery Person Name</p>
                            </div>
                            <div>
                                <p className="orderInfo">Delivery Person Number</p>
                            </div>
                            <div>
                                <p className="orderInfo">Cost</p>
                            </div>
                            <div>
                                <p className="orderInfo">Show Details</p>
                            </div>
                        </div>
                        {allOrders.filter((val) => {
                            if (allOrderStatus === "") {
                                return val;
                            }
                            else if (val.orderStaus.toLowerCase().includes(allOrderStatus.toLowerCase())) {
                                return val;
                            }
                        }).filter((val) => {
                            if (searchParam === "") {
                                return val;
                            }
                            else if (val.orderId.toLowerCase().includes(searchParam.toLowerCase())) {
                                return val;
                            }
                            // else if (val.orderStatus.toLowerCase().includes(searchParam.toLowerCase())) {
                            //     return val;
                            // }
                            // else if (val.deliveryPerson.toLowerCase().includes(searchParam.toLowerCase())) {
                            //     return val;
                            // }
                        }).map((item) => (
                            < div className='lower' >
                                <div>
                                    {console.log(item)}
                                    <p className="orderInfo">{item.orderId}</p>
                                </div>
                                <div>
                                    <p className="orderInfo">{item.orderPayment}</p>
                                </div>
                                <div>
                                    {item.orderStaus === "pending" &&
                                        <select onChange={(e) => changeOrderStatus(item, e.target.value)}>
                                            <option value="pending">Pending</option>
                                            <option value="ontheway">On the way</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>}
                                    {item.orderStaus === 'ontheway' && <select onChange={(e) => changeOrderStatus(item, e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="ontheway">On the way</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>}
                                    {item.orderStaus === 'delivered' && <select onChange={(e) => changeOrderStatus(item, e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="ontheway">On the way</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>}
                                    {item.orderStaus === 'cancelled' && <p className='orderInfo'>{item.orderStaus}</p>}
                                </div>
                                <div>
                                    {item.deliveryPerson ? <p className="orderInfo">{item.deliveryPerson}</p> : <input type="text" placeholder='Enter Delivery Person Name' onBlur={(e) => deliveryPersonName(item, e.target.value)} />}
                                </div>
                                <div>
                                    {item.deliveryPersonNo ? <p className="orderInfo">{item.deliveryPersonNo}</p> : <input type="text" placeholder='Enter Delivery Person No.' onBlur={(e) => deliveryPersonNumber(item, e.target.value)} />}
                                </div>
                                <div>
                                    <p className="orderInfo">{item.orderCost}</p>
                                </div>
                                <div>
                                    <Link to={`/showDetail/${item.orderId}`}>
                                        <button className="orderInfo">show details</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    )
}

export default OrderSection