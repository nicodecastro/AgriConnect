import { Cart, Product, productState, User  } from '../models/models.js';



// GET /cart/:itemId?email
// req param { itemId: string }
// req query { email: string }
export const addToCart = async (req, res) => {
    try {
        const userEmail = req.query.email;
        //check if user email exists in User
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found!');
        }
        const product = await Product.findOne({ product_id: req.params.itemId });
        if (!product) {
            let cart = await Cart.findOne({ email: userEmail });
            if (!cart) {
                return res.status(404).send({totalCartQty: 0, message: 'Product does not exist, cannot add to cart!', cartItems: []});
            }
            const cartItemIndex = cart.shopping_cart.findIndex(item => item.product_id === req.params.itemId);

            if(cartItemIndex != -1) {
                cart.shopping_cart.splice(cartItemIndex, 1);
            }
            
            const cartItems = cart.shopping_cart.map(item => ({
                cartItemID: item.cart_id,
    
                product_id: item.product_id,
                name: item.product_info.name,
                description: item.product_info.description,
                type: item.product_info.type,
                price: item.product_info.price,
                cart_qty: item.product_info.cart_qty,
                productState: item.product_info.productState,
                image: item.product_info.image
            }));

            let totalCartQty = 0
            cartItems.forEach(product => {
                totalCartQty = totalCartQty + product.cart_qty
            });

            await cart.save();

            return res.status(404).send({productListingMessage: 'Product does not exist, cannot add to cart.', totalCartQty, message: 'Product does not exist, product was removed from your cart.', cartItems: cartItems });
        } else if (product.qty <= 0) {
            return res.status(409).json({ message: `Product is out of stock!` });
        }

        // update product state and quantity
        product.productState = productState.IN_CART;
        // product.qty -= 1;        // moved to POST createOrder in order.controller.js

        //find user cart or create a new cart document for that new user
        let cart = await Cart.findOne({ email: userEmail });
        if (!cart) {
            cart = new Cart({
                email: userEmail,
                shopping_cart: []
            });
        }

        //find the product in the cart or add it to the cart
        let cartItem = cart.shopping_cart.find(item => item.product_id === req.params.itemId);
        if (cartItem) {

            // check if the current cart quantity is greater than or equal to the available stock
            if(cartItem.product_info.cart_qty == product.qty) {
                return res.status(409).json({ message: `Quantity will exceed available stock.`, quantity_in_cart: cartItem.product_info.cart_qty, quantity_in_stock: product.qty});
            } else if(cartItem.product_info.cart_qty > product.qty) {
                return res.status(409).json({ message: `Quantity already exceeds available stock.`, quantity_in_cart: cartItem.product_info.cart_qty, quantity_in_stock: product.qty});
            }

            cartItem.product_info.cart_qty += 1; //increase cart qty
        } else {
            //formatted each document passed in the shopping_cart array
            cartItem = {
                product_id: product.product_id,
                product_info : {
                name: product.name,
                description: product.description,
                type: product.type,
                price: product.price,
                cart_qty: 1,
                productState: productState.IN_CART,
                image: product.image
                }
            };
            cart.shopping_cart.push(cartItem);
        }

        const cartItems = cart.shopping_cart.map(item => ({
            cartItemID: item.cart_id,

            product_id: item.product_id,
            name: item.product_info.name,
            description: item.product_info.description,
            type: item.product_info.type,
            price: item.product_info.price,
            cart_qty: item.product_info.cart_qty,
            productState: item.product_info.productState,
            image: item.product_info.image
        }));

        let totalCartQty = 0
        cartItems.forEach(product => {
            totalCartQty = totalCartQty + product.cart_qty
        });


        await product.save();
        await cart.save();
        res.status(200).send({totalCartQty, message: `Added ${cartItem.product_info.name} to Cart! (Qty in cart: ${cartItem.product_info.cart_qty})`, cartItem: cartItem, updated_product: product, cartItems: cartItems});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

// GET /cart?email
// req query { email: string }
export const getCart = async (req, res) => {
    try {
        const userEmail = decodeURIComponent(req.query.email);
        //check if user email exists in User
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User is not found!');
        }
        const cart = await Cart.findOne({ email: userEmail });
        if (cart == null || cart.shopping_cart.length == 0) { //if cart is empty or doesn't exist
            return res.status(404).send('Cart is empty or not found!');
        }

        // map out each document in the shopping_cart array
        const cartItems = cart.shopping_cart.map(item => ({
            cartItemID: item.cart_id,

            product_id: item.product_id,
            name: item.product_info.name,
            description: item.product_info.description,
            type: item.product_info.type,
            price: item.product_info.price,
            cart_qty: item.product_info.cart_qty,
            productState: item.product_info.productState,
            image: item.product_info.image
        }));


        res.status(200).send({ cart_items: cartItems, totalQty: cart.shopping_cart.reduce((acc, item) => acc + item.product_info.cart_qty, 0) });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

// DELETE /cart/:itemId
export const deleteCartItem = async (req, res) => {
    try {
        const clearQty = req.query.clearQty;
        const userEmail = req.query.email;
        const cart = await Cart.findOne({ email: userEmail });
        if (!cart) { //check for cart existence
            return res.status(404).send('Cart not found!');
        }
        const product = await Product.findOne({ product_id: req.params.itemId });
        if (!product) { //check if product to delete exists
            const cartItemIndex = cart.shopping_cart.findIndex(item => item.product_id === req.params.itemId);
            cart.shopping_cart.splice(cartItemIndex, 1);
            await cart.save();
            const cartItems = cart.shopping_cart.map(item => ({
                cartItemID: item.cart_id,
    
                product_id: item.product_id,
                name: item.product_info.name,
                description: item.product_info.description,
                type: item.product_info.type,
                price: item.product_info.price,
                cart_qty: item.product_info.cart_qty,
                productState: item.product_info.productState,
                image: item.product_info.image
            }));
            return res.status(404).send({ message: 'Product does not exist, product was removed from your cart.', your_cart: { cart_items: cartItems, total_quantity : cart.shopping_cart.reduce((acc, item) => acc + item.product_info.cart_qty, 0) }});
        }

        //get index of the product in cart
        const cartItemIndex = cart.shopping_cart.findIndex(item => item.product_id === req.params.itemId);

        //get the product and update the product state and quantity
        const cartItem = cart.shopping_cart[cartItemIndex];
        product.productState = productState.IN_SHOP;
        // product.qty += 1;

        //deduct cart_qty of the product in the cart
        if(clearQty == 'true') {
            cartItem.product_info.cart_qty = 0;
        } else {
            if(cartItem.product_info.cart_qty > product.qty) {
                cartItem.product_info.cart_qty = product.qty;
            } else {
                cartItem.product_info.cart_qty -= 1;
            }
        }


        //if cart_qty is less than or equal to 0, remove the product from the shopping_cart
        if(cartItem.product_info.cart_qty <= 0) {
            cart.shopping_cart.splice(cartItemIndex, 1);
        }
        

        const cartItems = cart.shopping_cart.map(item => ({
            cartItemID: item.cart_id,

            product_id: item.product_id,
            name: item.product_info.name,
            description: item.product_info.description,
            type: item.product_info.type,
            price: item.product_info.price,
            cart_qty: item.product_info.cart_qty,
            productState: item.product_info.productState,
            image: item.product_info.image
        }));

        await product.save();
        await cart.save();

        res.status(200).send({message: `Successfully removed ${cartItem.product_info.name} from cart!`, 
                            your_cart : {
                                cart_items: cartItems, 
                                total_quantity : cart.shopping_cart.reduce((acc, item) => acc + item.product_info.cart_qty, 0)
                            }});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

export const clearCart = async (req, res) => {
    try {
        const userEmail = req.query.email;
        
        const cart = await Cart.findOne({ email: userEmail });
        if (!cart) { //check for cart existence
            return res.status(404).send('Cart not found!');
        }

        // // push products in an array
        // const cartItems = []
        // cart.shopping_cart.forEach(product => { cartItems.push(product)});

        // // update each product quantity in products db
        // for (let cartItem of cartItems) {
        //     await Product.findOneAndUpdate({ product_id: cartItem.product_id }, { $inc: { qty: cartItem.product_info.cart_qty } })
        // }

        // delete user's cart
        await Cart.deleteOne({ email: userEmail });

        res.status(200).send({ message: 'Successfully cleared cart!' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error });
    }
}
