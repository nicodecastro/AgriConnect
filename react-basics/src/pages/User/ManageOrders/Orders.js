import OrderList from './OrderList';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './Orders.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Orders() {
    const navigate = useNavigate();
    const email = jwtDecode(localStorage.getItem('token')).email;
    const [orders, setOrders] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [status, setStatus] = useState("Filter");

    const ordersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    
 
    const handleCancelOrder = async (orderId) => {
        axios.patch(`http://localhost:3001/orders/cancel?transactId=${encodeURIComponent(orderId)}`)
            .then((res) => {
                const updatedOrder = orders.map(order => {
                    if (order.transaction_id === orderId) {
                        return res.data.order
                    }
                    return order;
                })
                setOrders(updatedOrder);
                if (status === "Filter" || status === "All") {
                    setOrderList(updatedOrder)
                } else {
                    setOrderList(updatedOrder)
                    const updatedOrderList = orderList.map(order => {
                        if (order.transaction_id === orderId) {
                            return res.data.order
                        }
                        return order;
                    })
                    const filteredUpdatedOrderList = updatedOrderList.filter(order => order.ordered_products.order_status == status)
                    // console.log(updatedOrder.filter(orders => orders.ordered_products.order_status === status));
                    // setOrderList(updatedOrder.filter(orders => orders.ordered_products.order_status === status));
                    setOrderList(filteredUpdatedOrderList);
                }
            })
            .catch((error) => {
                console.error('Error canceling order', error);
            })
    }

    const getOrders = async (emailParam) => {
        try{
            const res = await axios.get(`http://localhost:3001/orders?email=${encodeURIComponent(emailParam)}`);
            console.log("order response",res);
            setOrders(res.data.transactions);
            setOrderList(res.data.transactions)
            // console.log(res.data.transactions)
        }catch(error){
            console.error("Error getting orders", error);
        }
    }

    useEffect(() => {
        getOrders(email);
    }, []);


    const handleOnChange = (e)=>{
        setStatus(e.target.value);
    }
    const filterListByStatus = (status) => {
        return status === "Filter" || status === "All" ?  orders : orders.filter(orders => orders.ordered_products.order_status == status);
       };    

    useEffect(()=>{
        const filtered = filterListByStatus(status);
        setOrderList(filtered);
    },[status])

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orderList.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orderList.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    return(
        <div className='order-page'>
        <div className="orders-header">
            <h1>Order Management</h1>
        </div>
        
        <div className='order-box'>
            <div className='box-top'>
                <button className="new-product-btn" onClick={()=>navigate('/shop')}>+ New Product</button>
                <div class="dropdown">
                    <select class="filter-drp" onChange={handleOnChange}>
                        <option class="dropdown-item" value={status} disabled selected>Filter</option>
                        <option class="dropdown-item" value="All">All</option>
                        <option class="dropdown-item" value="0">Pending</option>
                        <option class="dropdown-item" value="2">Canceled</option>
                        <option class="dropdown-item" value="1">Confirmed</option>
                    </select>
                </div>
            </div>

            <table className='order-table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order ID</th>
                            <th>Product ID</th>
                            <th>QTY</th>
                            <th>Status</th>
                            <th>Date & Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentOrders.map((order, i) => {
                                return <OrderList
                                    key={order.transaction_id}
                                    index={indexOfFirstOrder + i + 1}
                                    data={order}
                                    cancelOrder={handleCancelOrder}
                                />
                            })
                        }
                    </tbody>
                </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
        </div>
    )
}