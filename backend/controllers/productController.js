const Product = require("../models/Product");

const getProducts = async (req,res)=>{
    try{

        const products = await Product.find();

        res.status(200).json(products);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

const createProduct = async (req,res)=>{
    try{

        const product = await Product.create(req.body);

        res.status(201).json(product);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

const deleteProduct = async (req,res)=>{
    try{

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message:"Product Deleted"
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};


module.exports = {
    getProducts,
    createProduct,
    deleteProduct
};