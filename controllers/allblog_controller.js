const mongoose = require("mongoose")
const Blog = require("../models/M_allblog");
const Category = require("../models/M_Category")

module.exports = {
    getallblog: async (req,res)=>{
        try {
           const blogs = await Blog.find()
            .populate('category category')
            res.status(200).json({
                Total_Blog:blogs.length,
                blog:blogs.map(blog =>{
                    return {
                        title:blog.title,
                        category:blog.category,
                        Description:blog.Description
                    }
                })
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getblog: async (req, res, next) => {
        try {
            const blogs = await Blog.find()
            .select('-__v')
            .populate('category category _id')
            res.status(200).json(blogs)
        } catch (error) {
            res.status(500).json(error)
        }

    },

    addblog: async (req, res, next) => {
        Category.findById(req.body.categoryId)
        .then(category=>{
            if(!category){
                return res.status(500).json({
                    message:"category not"
                })
            }
            const blog = new Blog({
                _id: new mongoose.Types.ObjectId(),
                title: req.body.title,
                category: req.body.categoryId,
                Description: req.body.Description,
                slug: req.body.slug,
                publish_date:req.body.publish_date,
                Image: req.file.path
            });
            return blog.save() 
        })
            .then(result => {
                res.status(201).json({
                    message: "Blog Created"
                })
            })
            .catch(error => {
                res.status(500).json(error)
            })

    },

    getsingleblog: async (req, res, next) => {
        try {
            const id = req.params.blogId;
            const result = await Blog.findById(id)
            res.status(200).json(result)
        }
        catch (error) {
            res.status(500).json({
                error: error
            })
        }

    },

    updateblog: async (req, res, next) => {
        try {
            const id = req.params.blogId;
            const update = req.body
            const option = { new: true };
            const result = await Blog.findByIdAndUpdate(id, update, option)
            res.status(200).json({
                message: "Blog updated"
            })
        }
        catch (error) {
            res.status(500).json({
                error: err
            })
        }
    },

    deleteblog: async (req, res, next) => {
        try {
            const _id = req.params.blogId
            const result = await Blog.findByIdAndDelete(_id)
            res.status(200).json({
                message: "Blog Deleted"
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }
}