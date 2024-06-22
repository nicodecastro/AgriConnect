import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminOrderListing.css';

const AdminOrderListing = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  const [showAllPending, setShowAllPending] = useState(false);
  const [showAllConfirmed, setShowAllConfirmed] = useState(false);
  const [showAllCanceled, setShowAllCanceled] = useState(false);

  useEffect(() => {
    fetchOrders('http://localhost:3001/orders/pending', setPendingOrders, 'pendingOrders');
    fetchOrders('http://localhost:3001/orders/confirmed', setConfirmedOrders, 'confirmedOrders');
    fetchOrders('http://localhost:3001/orders/canceled', setCanceledOrders, 'canceledOrders');
  }, []);

  const fetchOrders = async (url, setState, orderType) => {
    try {
      await axios.get(url)
        .then((res) => {
          console.log(res.data);
          setState(res.data[orderType]);
        })
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleConfirm = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3001/orders/confirm?transactId=${orderId}`)
        .then((res) => {
          console.log(res.data);
          setPendingOrders(pendingOrders.filter(order => order.id !== orderId));
          fetchOrders('http://localhost:3001/orders/pending', setPendingOrders, 'pendingOrders');
          fetchOrders('http://localhost:3001/orders/confirmed', setConfirmedOrders, 'confirmedOrders');
        })
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  

  const renderOrders = (orders, isPending = false, showAll = false) => {
    const displayOrders = showAll ? orders : orders.slice(0, 3);
    return (
      <>
        {displayOrders.map(order => (
          <div key={order.id} className="order-item">
            <div className="order-details">
              <p className="order-info">Transaction ID: {order.transaction_id}</p>
              <p className="order-info">Customer Email: {order.email}</p>
              <p className="order-info">{order.ordered_products.product_name} (Product ID: {order.ordered_products.product_id}) </p>
              <p className="order-info">Quantity: {order.ordered_products.order_qty}</p>
              <p className="order-info">Price: {'₱'+order.ordered_products.sum_total.toFixed(2)}</p>
              <p className="order-info">Date and Time Ordered: {formatDate(order.order_date)}</p>
            </div>
            {isPending && (
              <button 
                className="confirm-button" 
                onClick={() => handleConfirm(order.transaction_id)}
              >
                Confirm
              </button>
            )}
            {!isPending && (
              <button className="confirm-button disabled" disabled>
                Confirmed
              </button>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="admin-order-listing">
      <div className="column">
        <h2 id="h2-pending">Pending Orders</h2>
        {renderOrders(pendingOrders, true, showAllPending)}
        {pendingOrders.length > 3 && (
          <button className="see-more-button" onClick={() => setShowAllPending(!showAllPending)}>
            {showAllPending ? 'See Less' : 'See More'}
          </button>
        )}
      </div>

      <div className="column">
        <h2 id="h2-confirmed">Confirmed Orders</h2>
        {renderOrders(confirmedOrders, false, showAllConfirmed)}
        {confirmedOrders.length > 3 && (
          <button className="see-more-button" onClick={() => setShowAllConfirmed(!showAllConfirmed)}>
            {showAllConfirmed ? 'See Less' : 'See More'}
          </button>
        )}
      </div>

      <div className="column">
        <h2 id="h2-cancelled">Canceled Orders</h2>
        {renderOrders(canceledOrders, false, showAllCanceled)}
        {canceledOrders.length > 3 && (
          <button className="see-more-button" onClick={() => setShowAllCanceled(!showAllCanceled)}>
            {showAllCanceled ? 'See Less' : 'See More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminOrderListing;
