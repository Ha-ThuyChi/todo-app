const db = require("../models");
const List = db.list;

exports.viewList = (req, res) => {
    List.findAll({
        where: {
            userId: req.params.userId,
        }
    }).then((records) => {
        res.status(200).send({success: true, message: records});
    }).catch((error) => {
        res.status(400).send({success: false, message: error.message})
    });
};

exports.createList = (req, res) => {
    List.create({
        name: req.body.name,
        userId: req.body.userId
    }).then(() => {
        res.status(200).send({success: true, message: "List is created."})
    }).catch((error) => {
        res.status(400).send({success: false, message: error.message})
    })
}