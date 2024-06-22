import './DeleteProduct.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DeleteProduct(props){
    const list = props.list    

    const deleteProduct = async (prodId) => { // does not print successful deletion prompt
        const response = await axios.delete(`http://localhost:3001/products/${prodId}`);
        return response.data;
    }

    function handleClick(list){ 
        for(let i = 0; i< list.length; i++){
            deleteProduct(list[i]);
        }
        props.updateList();
    }

    return(
        <>
        <div className='delete-page'>
            <div className='delete-content'>
                <div className='delete-left'>
                    <p> {list.length + " product(s) to be deleted"}</p>
                </div>

                <div className='delete-right'>
                    <button onClick={(e)=> {e.preventDefault(); handleClick(list)}} className='delete-btn'>Delete</button>
                </div>
            </div>
        </div>
        </>
    )
}