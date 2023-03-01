const express = require("express");
const { model } = require("mongoose");
const router= express.Router();
const admincontroller = require("../controllers/admincontroller");


router.get("/login",(req,res)=>{
    res.render("admin_login")
}) 

//login admin
router.post("/login",admincontroller.loginadmin);

//logout admin
router.delete("/logout/:adminId",admincontroller.logoutadmin);

module.exports=router;