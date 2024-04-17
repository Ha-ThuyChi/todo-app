const db = require("../models");
const List = db.list;

exports.viewList = (req, res) => {
    List.findAll({
        where: {
            userId: req.params.userId,
        }
    }).then((records) => {
        res.status(200).send({success: true, message: records});
    }).catch ((error) => {
        res.status(500).send({success: false, message: error.message})
    });
};

exports.createList = (req, res) => {
    List.create({
        name: req.body.name,
        userId: req.body.userId
    }).then(() => {
        res.status(200).send({success: true, message: "List is created."})
    }).catch ((error) => {
        res.status(500).send({success: false, message: error.message})
    });
}

exports.editListName = (req, res) => {
    List.update({
        name: req.body.name,
    }, {
        where: {
            id: req.body.listId,
        }
    }).then((result) => {
        if (result > 0) {
            res.status(200).send({success: true, message: `List name is updated successfully.`});
        } else {
            res.status(400).send({success: false, message: "Update list name unsucessfully."});
        }
    }).catch((error) => {
        res.status(500).send({success: false, message: error.message});
    });
};

exports.deleteList = (req, res) => {
    List.destroy({
        where: {
            id: req.params.listId
        }
    }).then((result) => {
        if (result > 0) {
            res.status(200).send({success: true, message: `List is delete successfully.`});
        } else {
            res.status(400).send({success: false, message: "Delete list unsucessfully."});
        };
    }).catch((error) => {
        res.status(500).send({success: false, message: error.message});
    });
}