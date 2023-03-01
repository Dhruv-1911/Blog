const express = require("express");
const router= express.Router();

const search_controller = require("../controllers/searchrouter")
//search blog with title
router.get("/:search",search_controller.search_router)

module.exports=router;