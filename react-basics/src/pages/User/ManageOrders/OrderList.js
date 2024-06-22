import axios from 'axios';
import { useEffect, useState } from 'react';

const OrderList = (props)=> {
    const data = props.data;
    const index = props.index;
    const cancelOrder = props.cancelOrder;
    // const product_id = props.product_id;
    // const order_qty = props.order_qty;
    const status = (stat)=>{
        let strStat = "";
        if(stat == 1){
            strStat = "Confirmed";
        }
        else if (stat == 2){
            strStat = "Canceled";
        }
        else{
            strStat = "Pending";
        }
        return strStat;
    }

    const formatDateToManila = (date) => {
        const options = {
            timeZone: 'Asia/Manila',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }

    return(
        <>
        <tr>
            <td>{index}</td>
            <td>{data.transaction_id}</td>
            <td>{data.ordered_products.product_name} (ID: {data.ordered_products.product_id})</td>
            <td>{data.ordered_products.order_qty}</td>
            <td className={status(data.ordered_products.order_status)}>{status(data.ordered_products.order_status)}</td>
            <td>{formatDateToManila(data.order_date)}</td>
            <td>{data.ordered_products.order_status === 0 ? (
                    <>
                        <button className="cancel-btn" onClick={ () => cancelOrder(data.transaction_id)}>Cancel</button>
                        
                    </>
                ) : data.ordered_products.order_status === 1 ? (
                    <>
                        {/* <button className="confirm-btn" disabled>Confirm</button> */}
                        <button className="cancel-btn" disabled>Cancel</button>
                    </>
                ) : (
                    <>
                        {/* <button className="confirm-btn" disabled>Confirm</button> */}
                        <button className="cancel-btn" disabled>Cancel</button>
                    </>
                )}
                </td>
        </tr>
        </>
    )
}

export default OrderList