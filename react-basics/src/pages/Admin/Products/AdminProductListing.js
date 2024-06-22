import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './AdminProductListing.css'
import axios from 'axios';
import Dropdown from '../../../components/Dropdown';
import DeleteProduct from './DeleteProduct';
import UpdateProduct from './UpdateProduct';

export default function AdminProductListing(){
    const [productList, setProductList] = useState([])
    const [toDelete, setToDelete] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [delVisible, setDelVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      fetchProducts();
    }, [])

    useEffect(() => {
        toDelete.length >0 ? setDelVisible(true) : setDelVisible(false);
      }, [toDelete])

    function updateDelList(){
      setToDelete([]);
    }

    const fetchProducts = () => {
      axios.get(`http://localhost:3001/products`)
        .then((res) => {
          console.log(res.data.products)          // REMOVE! For testing purposes only!
          setProductList(res.data.products)
        })
    }
    
    const sort = (sortByValue, orderByValue) => {
        axios.get(`http://localhost:3001/products?sort=${sortByValue}&order=${orderByValue}`)
          .then((res) => {
            setProductList(res.data.products)
          })
      }

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setToDelete(productList.map(li => li.product_id));

        if (isCheckAll) {
            setToDelete([]);
        }
    };

    const handleClick = (e) =>{
        const { id, checked } = e.target;
        setToDelete([...toDelete, id]);

        if (!checked) {
            setToDelete(toDelete.filter(item => item !== id));
         }
    }

    const deleteProduct = async (prodId) => { // does not print successful deletion prompt
      await axios.delete(`http://localhost:3001/products/${prodId}`)
        .then((res) => {
          setProductList(productList.filter(item => !toDelete.includes(item.product_id)));
        })
  }

    function handleDeleteClick(list){ 
      for(let i = 0; i< list.length; i++){
          deleteProduct(list[i]);
      }
      setToDelete([]);
      // fetchProducts();
      // updateList();
  }

    // const handleEdit

    return(
        <>
        <div className='admin-product-page'>
        <div className="admin-product-header">
            <h1>My Products</h1>
        </div>
        
        <div className='admin-product-box'>
            <div className='box-top'>
                <div className='bt-left'>
                    <h2>{productList.length} Product{productList.length>1 ? "s" : ""}</h2>
                    {
                        sortMenus.map((sortMenu, index) => {
                        return <Dropdown sortMenus={sortMenu} sortFunction={sort} key={index} />
                        })
                    }
                </div>
                <div className='bt-right'>
                    <button className="add-product-btn" onClick={()=>navigate('/admin/products/addproduct')}>+ Add a new Product</button>
                </div>
            </div>

            {
                productList.length > 0 ? (
                    <table className='admin-product-table'>
                        <tr>
                            <th><input className="select-all" type="checkbox" name="select" onClick={handleSelectAll} checked={isCheckAll}></input> Product(s)</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                        </tr>
                        {
                            productList.map((item) =>(
                                <tr>
                                    {<td>
                                        <div className='col1'>
                                            <input className="cb-input" id={item.product_id} type="checkbox" name="select" onClick={handleClick} checked={toDelete.includes(item.product_id)}></input>
                                            <div className='product-box'>
                                                <div className='pb-left'>
                                                    <img className="apl-img" src={item.image}></img>
                                                </div>

                                                <div className='pb-right'>
                                                    <h3 className='product-name'>{item.name}</h3>
                                                    <p className='product-detail'>Product ID: {item.product_id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>}
                                    <td>{"₱"+item.price.toFixed(2)}</td>
                                    <td>{item.qty}</td>
                                    <td><button onClick={(e)=> navigate(`/admin/products/update/${item.product_id}`)} className='edit-btn'>Edit</button></td>
                                </tr>
                            )
                            )
                        }
                    </table>
                 ) :
                <h1>No Products yet</h1>
            }
        </div>
        {delVisible && 
          <div className='delete-page'>
            <div className='delete-content'>
                <div className='delete-left'>
                    <p> {toDelete.length} product(s) to be deleted</p>
                </div>

                <div className='delete-right'>
                    <button onClick={()=> {handleDeleteClick(toDelete)}} className='delete-btn'>Delete</button>
                </div>
            </div>
        </div>
        }
        </div>
        </>
    )
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