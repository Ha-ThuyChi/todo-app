const { where } = require("sequelize");

const Task = require("../models").task;
const User = require("../models").user;

exports.viewTask = (req, res) => {
    Task.findAll({
        where: {
            listId: req.params.listId,
        },
        include: {
            model: User,
            attributes: ['name'],
            foreignKey: 'userId'
        }
    }).then((records) => {
        res.status(200).send({success: true, message: records});
    }).catch ((error) => {
        res.status(500).send({success: false, message: error.message})
    });
};

exports.assignTask = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        },
        attributes: ["id"]
    }).then((data) => {
        if (data) {
            const assigneeId = data.id;
            Task.update(
                {
                    assigneeId: assigneeId,
                },
                {
                    where: {
                        assigneeId: null,
                        id: req.body.taskId,
                    }
                }
            ).then((result) => {
                if (result > 0) {
                    res.status(200).send({success: true, message: `Assign task to user ${assigneeId} successfully.`})
                } else {
                    res.status(400).send({success: false, message: "The task is already updated."})
                }
            }).catch ((error) => {
                res.status(500).send({success: false, message: error.message})
            });
        } else {
            res.status(400).send({success: false, message: "Invalid email."});
        }
    }).catch ((error) => {
        res.status(500).send({success: false, message: error.message});
    });
};

exports.deleteAssignee = (req, res) => {
    Task.update({assigneeId: null}, {
        where: {
            id: req.params.taskId
        }
    }).then((result) => {
        if (result > 0) {
            res.status(200).send({success: true, message: `Delete task successfully.`})
        } else {
            res.status(400).send({success: false, message: "Delete task unsucessfully."})
        }
    }).catch ((error) => {
        res.status(500).send({success: false, message: error.message});
    })
};

exports.createTask = (req, res) => {
    const email = req.body.assigneeEmail;
    if (email) {
        User.findOne({
            where: {
                email: email
            },
            attributes: ["id"]
        }).then((data) => {
            if (data) {
                const assigneeId = data.id;
                Task.create({
                    name: req.body.name,
                    dueDate: req.body.dueDate,
                    isComplete: false,
                    priorityLevel: req.body.priorityLevel,
                    assigneeId: assigneeId,
                    listId: req.body.listId
                }).then(() => {
                    res.status(200).send({success: true, message: "Task is created."})
                }).catch(error => {
                    res.status(500).send({success: false, message: error.message})
                }) 
            } else {
                res.status(400).send({success: false, message: "Invalid email."});
            }   
        }).catch((error) => {
            res.status(500).send({success: false, message: error.message});
        })
    } else {
        Task.create({
            name: req.body.name,
            dueDate: req.body.dueDate,
            isComplete: false,
            priorityLevel: req.body.priorityLevel,
            assigneeId: null,
            listId: req.body.listId
        }).then(() => {
            res.status(200).send({success: true, message: "Task is created."})
        }).catch(error => {
            res.status(500).send({success: false, message: error.message})
        }) 
    }
}
