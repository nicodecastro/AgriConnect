import { useNavigate } from 'react-router-dom'
import './AddProduct.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function AddProduct() {
    const navigate = useNavigate();
    const[productList, setProductList]= useState([]);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [image, setImage] = useState('')
    const [displayImg, setDisplayImg] = useState('https://t3.ftcdn.net/jpg/01/80/31/10/360_F_180311099_Vlj8ufdHvec4onKSDLxxdrNiP6yX4PnP.jpg')

    useEffect(() => {
        fetchProducts();
    }, [])

    useEffect(() => {
        setDisplayImg(displayImg);
    }, [])

    const fetchProducts = () => {
        axios.get(`http://localhost:3001/products`)
          .then((res) => {
            console.log(res.data.products)          // REMOVE! For testing purposes only!
            setProductList(res.data.products)
          })
      }

    function getType(inputType){ 
        let retType = 0;
        if (inputType == "Crop"){
            retType = 1;
        }

        else if (inputType == "Poultry"){
            retType = 2;
        }
        return retType
    }

    const handleAddProduct = (event) => {
        event.preventDefault()
        axios
            .post('http://localhost:3001/products',
                {
                    name,
                    description,
                    price,
                    type: getType(type),
                    qty,
                    image
                })
            .then(() => {
                alert('Product Successfully Added')
                setName('')
                setDescription('')
                setType('')
                setPrice(0)
                setQty(0)
                setImage('')
                fetchProducts()
                navigate('/admin/products')
            })
            .catch((error) => {
                console.log('Unable to add product')
            })
    }

    return (
        <>
            <div class="addproduct-page">
                <form onSubmit={handleAddProduct}>
                    <h1>Add Product</h1>
                    <div className='ap-box'>
                        <div className='ap-left'>
                            <div className="general-box">
                                <h2>General Information</h2>
                                <label>Product Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} class="name-input" placeholder='Enter Product Name' required></input>
                                <label>Product Description</label>
                                <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} class="desc-input" placeholder='Description'></textarea>
                            </div>

                            <div className='price-box'>
                                <h2>Price and Stocks</h2>
                                <label>Base Pricing</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' required></input>
                                <label>Stock</label>
                                <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder='Quantity'></input>
                            </div>
                        </div>

                        <div className='ap-right'>
                            <div className='addimg-box'>
                                <h2>Upload Image</h2>
                                <input type="text" value={image} onChange={(e) => {setImage(e.target.value); setDisplayImg(e.target.value)}} placeholder='Image URL'></input>
                                <img className="display-img" src= {displayImg}></img>
                            </div>

                            <div className='type-box'>
                                <h2>Type</h2>
                                <label>Product Type</label>
                                <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder='Type (Crop,Poultry)' required></input>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='ap-button'>Add Product</button>
                </form>
            </div>
        </>
    )

}