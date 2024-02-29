const List = require("./list.model");
const User =  require("./user.model");

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        dueDate: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        isComplete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }, 
        priorityLevel: {
            type: Sequelize.ENUM("low", "medium", "high"),
            allowNull: true,
        }

    },
    {
        tableName: "tasks", 
        timeStamps: true,
    });
  
    return Task;
}