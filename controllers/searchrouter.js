const mongoose = require("mongoose")
const Blog = require("../models/M_allblog");

//search title
module.exports={

       search_router: async (req,res,next)=>{
         const search = await Blog.find({
            "$or":[
                {
                "title":{ $regex:req.params.search ,$options:"i"}
                }
            ]
         })
         res.status(200).send(search)
       }
}