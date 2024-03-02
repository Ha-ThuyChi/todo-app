const User = require("../models").user;

exports.createUser = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((result) => {
        if (result) {
            res.status(409).send({success: false, message: "Email addresd exists."})
        } else {
            User.create({
                name: req.body.name,
                dob: req.body.dob,
                email: req.body.email,
                password: req.body.password
            }).then(() => {
                res.status(200).send({success: true, message: "User is created."})
            }).catch(error => {
                res.status(500).send({success: false, message: error.message})
            }) 
        }
    }).catch((error) => {
        console.error("error:", error.message);
    })
}
exports.getUser = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    }).then((result) => {
        if (result) {
            res.status(200).send({success: true, message: result});
        } else {
            res.status(400).send({success: false, message: "Invalid email or password."});
        }
    }).catch(error => {
        res.status(500).send({success: false, message: error.message});
    })
}