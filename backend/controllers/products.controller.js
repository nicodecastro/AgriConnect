import { Product } from '../models/models.js';


export const getProduct = async (req, res) => {
    try{
        const { productId } = req.query;

        const product = await Product.findOne({ product_id: productId });
        if(product) {
            return res.status(200).json({ message: 'Product retrieved successfully', product });
        }

        res.status(404).json({ message: 'Product not found' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


// GET /products
// @param (string)[sort]. Default: 'name', Options: 'price', 'qty'
// @param (string)[order]. Default: 'asc', Options: 'asc', 'desc'
// sample quert: /products?sort=price&order=desc
export const getProducts = async (req, res) => {
    try {
        const { sort = 'name', order = 'asc' } = req.query; //default sort by name, ascending order
        const sortOrder = order === 'asc' ? 1 : -1;

        const products = await Product.find().sort({ [sort]: sortOrder });

        res.status(200).json({ message: 'Products retrieved successfully', products });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getTotalProducts = async (req, res) => {
    try {
        const products = await Product.find(); //
        const totalProducts = products.length;
        res.status(200).json({ message: 'Total products retrieved successfully', totalProducts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
}

// POST /products
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, type, qty, image } = req.body;
        
        const latestProduct = await Product.aggregate([
            {
                $addFields: { //create temp field for parsedInt product_id
                    product_id_int: { $toInt: "$product_id" }
                }
            },
            {
                $sort: { //sort
                    product_id_int: -1
                }
            },
            {   //get the latest product
                $limit: 1
            }
        ]);

        let newId = 0;
        if (latestProduct.length > 0) {
            newId = parseInt(latestProduct[0].product_id) + 1; //accesses product_id
        }

        // added default state on not required fields
        const newProduct = new Product({ 
            product_id : newId.toString(),
            name,
            description : description || 'No description available',
            type,
            price : price || 0,
            qty : qty || 0,
            productState: 'in_shop',
            image: image || ''
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server errors', error });
    }
};

// PATCH /products/:prodId
// @param (Number)prodId
export const updateProduct = async (req, res) => {
    try {
        const prodId  = req.params.prodId;
        const { name, description, type, price, qty, productState, image } = req.body;

        const product = await Product.findOne({ product_id : prodId });
        
        //updates only the fields that are provided in the req.body        
        const productToUpdate = {};
      
        if (name) productToUpdate.name = name;
        if (description) productToUpdate.description = description;
        if (type) productToUpdate.type = type;
        if (price) productToUpdate.price = price;
        if (qty) productToUpdate.qty = qty;
        if (productState) productToUpdate.productState = productState;
        if (image) productToUpdate.image = image;

        const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            {
                name,
                description,
                type,
                price,
                qty,
                productState,
                image,
            },
            { new: true }
        );

        if (updatedProduct) {
            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// DELETE /products/:prodId
// @param (Number)prodId
export const deleteProduct = async (req, res) => {
    try {
        const { prodId } = req.params;

        const product = await Product.findOne({ product_id : prodId });
        const deletedProduct = await Product.findByIdAndDelete(product._id);

        if (deletedProduct) {
            res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

