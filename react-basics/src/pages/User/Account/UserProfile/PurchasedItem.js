import React, { useState, useEffect } from 'react';
import './PurchasedItem.css';
import axios from 'axios';

const PurchasedItem = ({ item }) => {

  const convertStatus = (status) => {
    if (status == 0) {
      return 'Pending'
    } else if (status == 1) {
      return 'Confirmed'
    } else {
      return 'Canceled'
    }
  }

  const formatDateToManila = (date) => {
    const dateOptions = {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    const timeOptions = {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    // Format date
    const formattedDate = new Intl.DateTimeFormat('en-GB', dateOptions).format(new Date(date));
    // Format time
    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(date));

    // Split the formatted date to rearrange it to YYYY-MM-DD
    const [day, month, year] = formattedDate.split('/');
    const formattedDateString = `${year}-${month}-${day}`;

    // Combine date and time
    return `${formattedDateString} ${formattedTime}`;
}


  return (
    <>
      <div className="card">
        <div className="card-header">
            <span className="order-status">{convertStatus(item.ordered_products.order_status)}</span>
            <span className="order-date">Order Date: {formatDateToManila(item.order_date)}</span>
        </div>
        <div className="card-body">
            <div className="product-image">
                <img src={item.ordered_products.image} alt={item.ordered_products.product_name} />
            </div>
            <div className="product-details">
                <h4 className="product-name">{item.ordered_products.product_name}</h4>
                <p className="product-price">&#8369;{item.ordered_products.price}</p>
                <p className="product-quantity">Quantity: {item.ordered_products.order_qty}</p>
            </div>
        </div>
        <div className="card-footer">
            <p className="product-total">Total: &#8369;{item.ordered_products.sum_total.toFixed(2)}</p>
        </div>
    </div>
    </>
  )
};

export default PurchasedItem;
