import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SalesReport from './SalesReport';
import './SalesFunctionality.css';

const AdminReports = () => {    

    useEffect(() => {
        fetchOrdered();
      }, [])

    const fetchOrdered = () => {
        axios.get(`http://localhost:3001/sales`)
          .then((res) => {
            setSalesData(res.data.productsSold)
            console.log(res.data.productsSold)
            console.log(res.data.salesSummary.weekly)
            setWeeklySales(res.data.salesSummary.weekly)
            setMonthlySales(res.data.salesSummary.monthly)
            setAnnualSales(res.data.salesSummary.annual)
            setTotalSales(res.data.totalSales)
          })
      }

  const [salesData, setSalesData] = useState([]);
  const [weeklySales, setWeeklySales] = useState({});
  const [monthlySales, setMonthlySales] = useState({});
  const [annualSales, setAnnualSales] = useState({});
  const [totalSales, setTotalSales] = useState(0);
  const [filter, setFilter] = useState('weekly');

  return (
    <div className="admin-reports">
      <header className="header">
        <h1>Sales Report</h1>
        <div className="filter-buttons">
          <button onClick={() => setFilter('weekly')}>Weekly</button>
          <button onClick={() => setFilter('monthly')}>Monthly</button>
          <button onClick={() => setFilter('annual')}>Annual</button>
        </div>
      </header>
      <SalesReport 
      salesData = {salesData}
      filter={filter} 
      weeklySales = {weeklySales}
      monthlySales = {monthlySales}
      annualSales = {annualSales}
      total = {totalSales}
      />
    </div>
  );
};

export default AdminReports;
