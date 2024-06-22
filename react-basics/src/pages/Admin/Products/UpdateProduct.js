import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './AddProduct.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function UpdateProduct() { // to be modified
    let { product_id } = useParams();
    // // let { state } = useLocation();  
    // let location = useLocation();

    // console.log("name: ", location.state.name)

    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState(0)
    const [qty, setQty] = useState(0)
    const [image, setImage] = useState('')
    const [productState, setProductState] = useState('')

    useEffect(() => {
        fetchProduct();
    }, [])

    const fetchProduct = () => {
        axios.get(`http://localhost:3001/product?productId=${encodeURIComponent(product_id)}`)
            .then((res) => {
                // console.log(res.data);
                const product = res.data.product
                setName(product.name);
                setDescription(product.description);
                setType(intToStringType(product.type));
                setPrice(product.price);
                setQty(product.qty);
                setImage(product.image);
                setProductState(product.productState);
            })
    }

    function intToStringType(inputType) {
        if(inputType == "1") {
            return "Crop"
        } else if(inputType == "2") {
            return "Poultry"
        }
    }

    function getType(inputType) {
        let retType = 0;
        if (inputType == "Crop" || inputType == "1") {
            retType = 1;
        }

        else if (inputType == "Poultry" || inputType == "2") {
            retType = 2;
        }
        return retType
    }

    const handleUpdateProduct = (event) => {
        event.preventDefault()
        axios
            .patch(`http://localhost:3001/products/${product_id}`,
                {
                    name,
                    description,
                    type: getType(type),
                    price,
                    qty,
                    productState,
                    image
                })
            .then(() => {
                alert('Changes Successfully Saved')
                setName('')
                setDescription('')
                setType('')
                setPrice(0)
                setQty(0)
                setImage('')
                fetchProduct()
                navigate('/admin/products')
            })
            .catch((error) => {
                console.log('Unable to save changes')
            })
    }

    return (
        <>
            <div class="addproduct-page">
                <form onSubmit={handleUpdateProduct}>
                    <h1>Update Product</h1>
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
                                <input type="text" value={image} onChange={(e) => { setImage(e.target.value) }} placeholder='Image URL'></input>
                                <img className="display-img" src= {image}></img>
                            </div>

                            <div className='type-box'>
                                <h2>Type</h2>
                                <label>Product Type</label>
                                <input type="text" value={type} onChange={(e) => setType(e.target.value)} placeholder='Type (Crop,Poultry)' required></input>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className='ap-button'>Save Changes</button>
                </form>
            </div>
        </>
    )

}