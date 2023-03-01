const express = require("express");
const router= express.Router();

const categorycontroller = require("../controllers/category_controller");
//show al category
router.get("/",categorycontroller.getcategory)

//create category
router.post("/",categorycontroller.createcategory)

//update category
router.patch("/:categoryId",categorycontroller.updatecategory)

//delete category
router.delete("/:categoryId",categorycontroller.deletecategory)

module.exports=router;