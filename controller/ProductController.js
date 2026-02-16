const Product = require("../models/Products");
const User = require("../models/User")


exports.addProduct = async (req, res) => {
    try {
        const { userId, title, price, stock } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "user not found" });
        }


        if (user.role !== "admin") {
            return res.status(403).json({ msg: "access denied" });
        }

        if (!title || !price) {
            return res.status(400).json({ msg: "missing required data" });
        }

        const existPro = await Product.findOne({ title });
        if (existPro) {
            return res.status(400).json({ msg: "product already exists" });
        }

        const product = await Product.create({
            title,
            price,
            stock,
            user: user._id
        });
        res.status(201).json({ msg: "Product created successfully", data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" });
    }
};


exports.getProduct = async (req, res) => {
    try {
        // const product = await Product.findOne({ title });
        //     if (!product) {
        //         return res.status(400).json({
        //             msg: "product account not found"
        //         });
        //     }
        const product = await Product.find();

        res.json({
            success: true,
            count: product.length,
            data: product
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
}

exports.SearchProduct = async (req, res) => {
    try {
        
    const { title } = req.query;
    let filter = {};
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } 
    
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
}