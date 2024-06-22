import { 
  registerUser,
  loginUser
 } from '../controllers/auth.controller.js';

import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  getTotalProducts,
  getProduct} from '../controllers/products.controller.js';

import { 
  getCart, 
  addToCart, 
  deleteCartItem,
  clearCart } from '../controllers/shoppingcart.controller.js'

import { 
  createOrder, 
  getOrders,
  getPendingOrders, 
  getConfirmedOrders, 
  getCanceledOrders, 
  cancelOrder, 
  confirmOrder, 
  getTotalOrders} from '../controllers/order.controller.js';

import { 
  getTotalUsers,
  getUser,
  updateUser,
  getUsers } from '../controllers/user.controller.js';
  
import { 
  getSalesReport } from '../controllers/salesreport.controller.js';
export default function router(app) {

  // Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })
  
  // add routes here
  
  // auth routes
  app.get("/register", getUsers);    // test route
  app.post("/register", registerUser);
  app.post("/login", loginUser);

  app.get("/user", getUser);
  app.post("/user", updateUser);
  app.get("/users", getUsers);
  app.get("/users/total", getTotalUsers);

  // cart routes
  app.get("/cart", getCart);
  app.get("/cart/:itemId", addToCart);
  app.delete("/cart/:itemId", deleteCartItem);
  app.delete("/clearcart", clearCart)

  // order routes
  app.post("/orders", createOrder);
  app.get("/orders", getOrders); // test route (get all orders
  app.get("/orders/total", getTotalOrders);
  app.get("/orders/pending", getPendingOrders);
  app.get("/orders/confirmed", getConfirmedOrders);
  app.get("/orders/canceled", getCanceledOrders);
  app.patch("/orders/cancel", cancelOrder);
  app.patch("/orders/confirm", confirmOrder);

  //products routes
  app.get("/product", getProduct);
  app.get("/products", getProducts);
  app.get("/products/total", getTotalProducts);
  app.post("/products", createProduct);
  app.patch("/products/:prodId", updateProduct);
  app.delete("/products/:prodId", deleteProduct);

  //sales report routes
  app.get("/sales", getSalesReport);
}