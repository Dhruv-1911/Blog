const express = require("express");
const { model } = require("mongoose");
const multer  = require('multer')
const router= express.Router();
const path = require("path")
const allblog_controller = require("../controllers/allblog_controller.js");

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./uploads")
    },filename:function(req,file,cb){
       cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage:storage}) 

//get blog with title/description/category
router.get("/allblog",allblog_controller.getallblog);

//get all blog details
router.get("/",allblog_controller.getblog);

//create blog
router.post("/",upload.single("Image"),allblog_controller.addblog);

//get single blog 
router.get("/:blogId",allblog_controller.getsingleblog)

//update blog 
router.patch("/:blogId",allblog_controller.updateblog)

//delete blog
router.delete("/:blogId",allblog_controller.deleteblog);

module.exports=router;