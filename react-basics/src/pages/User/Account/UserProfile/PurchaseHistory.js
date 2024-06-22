// src/components/PurchaseHistory.js
import React, { useState, useEffect } from 'react';
import './PurchaseHistory.css';
import PurchasedItem from './PurchasedItem';

const PurchaseHistory = ({ items }) => {
  const [itemList, setItemList] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const filterListByStatus = (status) => {
    return items.filter(orders => orders.ordered_products.order_status == convertStatus(status));
  };

  useEffect(()=>{
    const filtered = filterListByStatus(activeTab);
    setItemList(filtered);
  },[activeTab])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const convertStatus = (status) => {
    if (status == 'pending') {
      return 0
    } else if (status == 'confirmed') {
      return 1
    } else {
      return 2
    }
  }

  return (
    <div className="purchase-history">
      <h3>Purchase History</h3>
      <div className="tabs">
        <div className={`tab ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
            Pending
        </div>
        <div className={`tab ${activeTab === 'confirmed' ? 'active' : ''}`} onClick={() => setActiveTab('confirmed')}>
            Confirmed
        </div>
        <div className={`tab ${activeTab === 'canceled' ? 'active' : ''}`} onClick={() => setActiveTab('canceled')}>
            Canceled
        </div>
      </div>
      <ul>
        {currentItems && JSON.stringify(currentItems) != '{}' ? currentItems.map((item, index) => (
          <li key={index}><PurchasedItem item={item}/></li>
        )) : <div>No products found!</div>}
      </ul>
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
  );
};

export default PurchaseHistory;
