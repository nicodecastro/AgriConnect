/*
This script is used to test the API requests of the web app

Make sure servver is running:
1) In the react-basics/backend directory run: 
    node index.js
2) In the same directory run the tests:
    node test-requests.js

Add necessary tests as needed
*/

import needle from 'needle';

// GET /register test
// await needle('get', 'http://localhost:3001/register')
//   .then(function(res) {
//     console.log(res.body);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// POST register test
// await needle('post', 'http://localhost:3001/register', 
//   {
//     first_name: 'Alan',
//     // middle_name: 'Mathison',
//     last_name: 'Turing',
//     email: 'amturing@cam.ac.uk',
//     password: 'alanturing123'
//   }
// )
//   .then(function(res) {
//     console.log(res.body);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });


// POST /login test
// await needle('post', 'http://localhost:3001/login', 
//   {
//     email: 'amturing@cam.ac.uk',
//     password: 'alanturing123'
//   }
// )
//   .then(function(res) {
//     console.log('Valid Credentials');
//     console.log(res.body);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// await needle('post', 'http://localhost:3001/login', 
//   {
//     email: 'amturing@cam.ac.uk',
//     password: 'alanturing122'
//   }
// )
//   .then(function(res) {
//     console.log('Invalid Credentials (Wrong Password)');
//     console.log(res.body);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

// await needle('post', 'http://localhost:3001/login', 
//   {
//     email: 'amnotturing@cam.ac.uk',
//     password: 'alanturing123'
//   }
// )
//   .then(function(res) {
//     console.log('Invalid Credentials (Wrong Email)');
//     console.log(res.body);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });

var data = {
  "name": "Bbq",
  "description": "Fries",
  "type": 0,
  "price": 100,
  "qty": 24,
  "productState": "in_shop",
}

var data2 = {
  "name" : "Lenten",
  "description" : "Juisce",
  "type" : 1,
  "price" : 200,
  "qty" : 40,
  "productState" : "in_shop",
}
var update = {
  "price" : 300
}
//PRODUCT TESTS

// POST /products
// await needle('post', 'http://localhost:3000/products', data2, {json: true}).then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });

// GET /products
// await needle('get', 'http://localhost:3000/products?sort=name&order=desc', {}, {json : true}).then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//     console.log(err);
// });

// PATCH /products/:id
// await needle('patch', 'http://localhost:3000/products/1', update, {json: true}).then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });

// PATCH /products/:id
// await needle('delete', 'http://localhost:3000/products/0', {}, {json: true}).then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });


// CART TESTS
// GET /cart/:itemId
// get a single product from products collection via product id (id) then store in shopping cart of user
// await needle('get', 'http://localhost:3000/cart/1').then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });

// GET /cart
//get shopping cart items from a user via email
// await needle('get', 'http://localhost:3000/cart').then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });

// DELETE /cart/:itemId
// deduct quantity of added product in shopping cart, remove completely the product from shopping cart if quantity is zero
// await needle('delete', 'http://localhost:3000/cart/:itemId').then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });


// ORDER TESTS

// POST /orders accepts {email: "user@example.com"}
// await needle('post', 'http://localhost:3000/orders', {email : "guest@gmail.com"}, {json: true})
// .then(function(res){
//     console.log(res.body);
// }).catch(function(err){
//   console.log(err);
// });

// GET /orders/pending 
// await needle('get', 'http://localhost:3000/orders/pending')
// .then(function(res){
//   console.log(res.body);
// })
// .catch(function(err){
//   console.log(err)
// });

// // GET /orders/confirmed
// await needle('get', 'http://localhost:3000/orders/confirmed')
// .then(function(res){
//   console.log(res.body);
// })
// .catch(function(err){
//   console.log(err)
// });

// // GET /orders/canceled
// await needle('get', 'http://localhost:3000/orders/canceled')
// .then(function(res){
//   console.log(res.body);
// })
// .catch(function(err){
//   console.log(err)
// });

const sampleTransactId = "tx-1715440883337-3074";
const sampleTransactId2 = "tx-1715440883336-115";
// PATCH /orders/:transactId/cancel
// await needle('patch', `http://localhost:3000/orders/${sampleTransactId}/cancel`)
// .then(function(res) {
//   console.log(res.body);
// })
// .catch(function(err) {
//   console.log(err);
// });


// PATCH /orders/:transactId/confirm
// await needle('patch', `http://localhost:3000/orders/${sampleTransactId2}/confirm`)
// .then(function(res){
//   console.log(res.body);
// })
// .catch(function(err){
//   console.log(err)
// });


// GET /sales
await needle('get', 'http://localhost:3000/sales')
.then (function(res){
  console.log(res.body);
})
.catch(function(err){
  console.log(err);
});