import React, { useEffect, useState } from 'react';
import './ProductListing.css';
import axios from 'axios';
import Dropdown from '../../../components/Dropdown.js';
import { jwtDecode } from 'jwt-decode';
import Expire from '../../../components/Expire.js';

const ProductListing = () => {
  const [productList, setProductList] = useState([])
  const [isProductListEmpty, setIsProductListEmpty] = useState(false)
  const [key, setKey] = useState(0)
  const [requestMessage, setRequestMessage] = useState('')
  const [bgColor, setBgColor] = useState("#0A6847")

  const userEmail = jwtDecode(localStorage.getItem('token')).email

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    await axios.get(`http://localhost:3001/products`)
      .then((res) => {
        setProductList(res.data.products)
      })
      .catch((error) => {
        setIsProductListEmpty(true)
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            console.log(error.request)
        }
    })
  }

  const sort = async (sortByValue, orderByValue) => {
    await axios.get(`http://localhost:3001/products?sort=${sortByValue}&order=${orderByValue}`)
      .then((res) => {
        setProductList(res.data.products)
      })
      .catch((error) => {
        if (error.response) {
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            console.log(error.request)
        }
    })
  }

  const addToCart = async (productId) => {
    await axios.get(`http://localhost:3001/cart/${productId}?email=${userEmail}`)
      .then((res) => {
        const updatedProductList = productList.map(product => {
          if(product.product_id === productId) {
            return res.data.updated_product
          } else {
            return {
              ...product
            }
          }
        })
        setProductList(updatedProductList)
        setRequestMessage(res.data.message)
        setKey(key+1)
        setBgColor("#0A6847")
        console.log(res.data)
      })
      .catch((error) => {
        if (error.response) {
            if(error.response.status === 409) {
              setRequestMessage(`${error.response.data.message} (Qty in cart: ${error.response.data.quantity_in_cart})`);
              setKey(key+1);
              setBgColor("#D32F2F")
            } else if (error.response.status === 404) {
              setRequestMessage(error.response.data.productListingMessage);
              setKey(key+1);
              setBgColor("#D32F2F")
            } else {
              console.log(error.response.data)
              console.log(error.response.status)
              console.log(error.response.headers)
            }
        } else if (error.request) {
            console.log(error.request)
        }
    })
  }

  return (
    <div className="content">
      <div className="sort">
        <span className="sort-by-text">Sort by</span>
        <div className="dropdown-btns">
          {
            sortMenus.map((sortMenu, index) => {
              return <Dropdown sortMenus={sortMenu} sortFunction={sort} key={index} />
            })
          }
        </div>
      </div>
      <div className="product-listing">
        {isProductListEmpty ? <h3>No products found!</h3> : productList.map(product => (product.qty > 0 ?
          <div className="product-card" key={product.product_id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>In Stock: {product.qty}</p>
              <button onClick={() => addToCart(product.product_id)}>&#8369;{product.price.toFixed(2)} Add to Cart</button>
            </div>
          </div> :
          <div className="product-card product-unavailable" key={product.product_id}>
            <div className="unavailable">Product is unavailable</div>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>In Stock: {product.qty}</p>
              <button disabled>&#8369;{product.price.toFixed(2)} Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {<Expire delay="3000" text={requestMessage} bgColor={bgColor} expireKey={key} />}
    </div>
  );
}

const sortMenus = [
  {
    title: "Name",
    menus: [
      "Name: A-Z",
      "Name: Z-A"
    ],
    sortByValue: "name"
  },
  {
    title: "Type",
    menus: [
      "Type: Show Crops First",
      "Type: Show Poultry First"
    ],
    sortByValue: "type"
  },
  {
    title: "Price",
    menus: [
      "Price: Low-High",
      "Price: High-Low"
    ],
    sortByValue: "price"
  },
  {
    title: "Quantity",
    menus: [
      "Quantity: Low-High",
      "Quantity: High-Low"
    ],
    sortByValue: "qty"
  },
]

export default ProductListing;
