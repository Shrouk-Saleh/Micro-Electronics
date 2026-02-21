const express = require("express");
const router = express.Router();

const { addProduct,getProduct,SearchProduct } = require("../controller/ProductController");

router.post("/addProduct", addProduct);
router.get("/getProduct", getProduct);
router.get("/SearchProduct", SearchProduct);
module.exports = router;
