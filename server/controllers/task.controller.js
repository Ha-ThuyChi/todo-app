const Task = require("../models").task;
const User = require("../models").user;

exports.viewTask = (req, res) => {
    Task.findAll({
        where: {
            listId: req.params.listId,
        },
        include: {
            model: User,
            attributes: ["name"],
            foreignKey: 'userId'
        }
    }).then((records) => {
        res.status(200).send({success: true, message: records});
    }).catch((error) => {
        res.status(400).send({success: false, message: error.message})
    });
}