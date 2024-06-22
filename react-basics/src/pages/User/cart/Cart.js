import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Cart.css';
import { jwtDecode } from 'jwt-decode';
import Expire from '../../../components/Expire';

const Cart = () => {
    const [cartList, setCartList] = useState([])
    const [cartQty, setCartQty] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [isCartEmpty, setIsCartEmpty] = useState(true)
    const [orderTotal, setOrderTotal] = useState(0)
    const [requestMessage, setRequestMessage] = useState(0)
    const [key, setKey] = useState(0)
    const [bgColor, setBgColor] = useState("#C62828")
    const shipping = 0

    const userEmail = jwtDecode(localStorage.getItem('token')).email

    useEffect(() => {
        fetchCart();
        setIsLoading(false);
    }, [])

    const getOrderTotal = () => {
        let orderTotal = 0
        cartList.forEach((item) => {
            orderTotal = orderTotal + item.price * item.cart_qty
        })
        return orderTotal
    }

    const getSubtotal = () => {
        return getOrderTotal() + shipping;
    }

    const fetchCart = async () => {
        await axios.get(`http://localhost:3001/cart/?email=${userEmail}`)
            .then((res) => {
                setCartList(res.data.cart_items)
                setCartQty(res.data.totalQty)
                setIsCartEmpty(false)
                console.log(res.data)
            })
            .catch((error) => {
                setIsCartEmpty(true)
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
            setCartList(res.data.cartItems)
            setCartQty(res.data.totalCartQty)
            setRequestMessage(res.data.message)
            setKey(key+1)
            setBgColor("#2E7D32")
            console.log(res.data)
          })
          .catch((error) => {
            if (error.response) {
                if(error.response.status === 409) {
                    console.log(error.response.data)
                  setRequestMessage(`${error.response.data.message} (Available stock: ${error.response.data.quantity_in_stock})`);
                  setKey(key+1);
                  setBgColor("#D32F2F")
                } else if (error.response.status === 404) {
                    setRequestMessage(error.response.data.message)
                    setKey(key + 1)
                    setBgColor("#D32F2F")
                    setCartList(error.response.data.cartItems)
                    setCartQty(error.response.data.totalCartQty)
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

    const removeFromCart = async (itemId, clearQty) => {
        await axios.delete(`http://localhost:3001/cart/${itemId}?email=${userEmail}`, { params: {clearQty}})
            .then((res) => {
                setRequestMessage(res.data.message)
                setKey(key + 1)
                setBgColor("#C62828")
                setCartList(res.data.your_cart.cart_items)
                setCartQty(res.data.your_cart.total_quantity)
                if (res.data.your_cart.total_quantity == 0) {
                    setIsCartEmpty(true)
                }
                setOrderTotal(getOrderTotal)
                console.log(res.data)
            })
            .catch((error) => {
                if(error.response.status === 404) {
                    setCartList(error.response.data.your_cart.cart_items)
                    setCartQty(error.response.data.your_cart.total_quantity)
                    setRequestMessage(error.response.data.message)
                    setKey(key + 1)
                    setBgColor("#D32F2F")
                    if (error.response.data.your_cart.total_quantity == 0) {
                        setIsCartEmpty(true)
                    }
                    setOrderTotal(getOrderTotal)
                }
                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                } else if (error.request) {
                    console.log(error.request)
                }
            })
    }

    const checkoutCart = async () => {
        if(cartQty == 0) {
            setRequestMessage("Shopping cart is empty!")
            setKey(key + 1)
            setBgColor("#D32F2F")
            return
        }
        await axios.post(`http://localhost:3001/orders?email=${userEmail}`)
            .then((res) => {
                console.log(res.data)
                setRequestMessage(res.data.message)
                setKey(key + 1)
                setBgColor("#2E7D32")
                setCartList([])
                setCartQty(0)
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 409 || error.response.status === 404) {
                        setRequestMessage(error.response.data.message);
                        setKey(key + 1);
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

    const clearCart = async () => {
        await axios.delete(`http://localhost:3001/clearcart?email=${userEmail}`)
            .then((res) => {
                console.log(res.data)
                setRequestMessage(res.data.message)
                setKey(key + 1)
                setBgColor("#C62828")
                setCartList([])
                setCartQty(0)
                setIsCartEmpty(true)
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

    return (
        <div id="shopping-cart">
            <span id="cart-title">Shopping Cart (Total: {cartQty})</span>
            <div id="cart-summary-container">
                <div id="cart-items">
                    {
                        isLoading && <h4> Loading... </h4>
                    }
                    {
                        !isLoading && isCartEmpty ? <h3>Your cart is empty!</h3> :
                            cartList.map((item, index) => {
                                return <div className="cart-card" id={item.id} key={index}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="cart-item-name">{item.name}</div>
                                    <button onClick={() => removeFromCart(item.product_id, 'false')} className='remove-from-cart'>-</button>
                                    <div>QTY: {item.cart_qty}</div>
                                    <button onClick={() => addToCart(item.product_id)} className='remove-from-cart'>+</button>
                                    <button onClick={() => removeFromCart(item.product_id, 'true')} className="remove-from-cart end">X</button>
                                </div>
                            })
                    }
                    {!isCartEmpty && <button onClick={() => clearCart()} className='clear-cart'>Clear Cart</button>}
                </div>
                <div id="summary">
                    <div id="summary-container">
                        <h2>Summary</h2>
                        <p>Order Total: &#8369;{getOrderTotal().toFixed(2)}</p>
                        <p>Shipping: &#8369;{shipping.toFixed(2)}</p>
                        <p>Subtotal: &#8369;{getSubtotal().toFixed(2)}</p>
                    </div>
                    <button onClick={() => checkoutCart()}>CHECKOUT</button>
                </div>
            </div>
            {<Expire delay="3000" text={requestMessage} bgColor={bgColor} expireKey={key} />}
        </div>
    )
}

export default Cart