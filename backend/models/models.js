import mongodbConnection from './mongodb.connection.js'
import mongoose from 'mongoose';

 const productState = {
    IN_SHOP : 'in_shop',
    IN_CART :'in_cart',
    IN_ORDER : 'in_order'
}

 const typeOfUser = {
    USER : 'user',
    ADMIN :'admin'
}
// User model
const User = mongodbConnection.model('User', {
	first_name: {
        type: String,
        required: true
    },
	middle_name: String,
	last_name: {
        type: String,
        required: true
    },
	user_type: {
        type: String,
        enum : [typeOfUser.USER,typeOfUser.ADMIN ],
        default : typeOfUser.USER
    },
	email: {
        type : String,
        unique : true
    },
    password: String
});

// Product model
const Product = mongodbConnection.model('Product', {
	product_id: {
        type : String,
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: Number,
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    qty: Number,
    productState : {
        type: String,
        enum: [productState.IN_SHOP,
            productState.IN_CART],
        default: productState.IN_SHOP
    },
    image: String,
});

// Transaction model
const Transaction = mongodbConnection.model('Transaction', {
	transaction_id: {
        type: String,
        unique : true
    },
    ordered_products :{
    	product_id: {
        	// type: mongoose.Schema.Types.ObjectId,
        	// ref: 'Product'  //added Product.id reference
        	// uncomment below for testing purposes
        	type : String,
        	required : true
    	},
    	order_qty: {
        	type: Number,
        	default: 0
    	},
    	order_status: {
        	type: Number,
        	default: 0
    	},
        sum_total : {
            type : Number,
            default : 0
        },
        product_name: String,
        image: String,
        price: Number
    },
    email: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref : 'User' //added User.email reference
        // uncomment below for testing purposes
        type : String,
        required : true
    },
    order_date: Date,
    time: String
});

const cartItemSchema = mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     default: new mongoose.Types.ObjectId // Generate a new ObjectId by default
    // },
    product_id: {
        type : String,
        // unique : true
    },
    product_info : {
        name: {
            type: String,
            required: true
        },
        description: String,
        type: {
            type: Number,
            required : true
        },
        price: {
            type: Number,
            required: true
        },
        cart_qty: Number,
        productState: {
            type: String,
            enum: [productState.IN_SHOP,
                productState.IN_CART],
            default: productState.IN_SHOP
        },
        image: String,
    }
})
const Cart = mongodbConnection.model('Cart', {
    email:  {
        // type: mongoose.Schema.Types.ObjectId,
        // ref : 'User' //added User.email reference
        // uncomment below for testing purposes
        type : String, 
        required : true
    },
    shopping_cart: [cartItemSchema] //
});
export { User, Product, Transaction, Cart, productState, typeOfUser }