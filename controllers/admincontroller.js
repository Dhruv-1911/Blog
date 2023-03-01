const mongoose = require("mongoose")
const Admin = require("../models/M_admin")
const bcrypt = require('bcrypt');
module.exports = {
    //create admin_controller
    loginadmin: (req, res, next) => {
        //check admin
        Admin.find({ email: req.body.email })
            .exec()
            .then(result => {
                if (result.length >= 1) {
                    return res.status(409).json({
                        message: "admin exits"
                    })
                }
                else {
                    //bcrypt password
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            })
                        }
                        else {
                            const admin = new Admin({
                                _id: new mongoose.Types.ObjectId(),
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            })
                            admin.save()
                                .then(result => {
                                    console.log(result);
                                    res.status(201).json({
                                        message: "admin created",
                                    })
                                    // res.render("blog")
                                    // res.redirect("/blog")
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(409).json({
                                        error: err
                                    })
                                })
                        }
                    }

                    )
                }
            })
    },
//delete admin-controller
    logoutadmin: (req, res, next) => {
        const _id = req.params.adminId;
        Admin.deleteOne({ _id }).exec()
            .then(result => {
                res.status(200).json({
                    message: "admin deleted"
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
}