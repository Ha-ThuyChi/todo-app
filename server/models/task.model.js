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
            type: Sequelize.ENUM("Low", "Medium", "High"),
            allowNull: true,
        },

    },
    {
        tableName: "tasks", 
        timeStamps: true,
    });
    Task.associate = (models) => {
        Task.belongsTo(models.User, { foreignKey: 'assigneeId' });
    };
    Task.associate = (models) => {
        Task.belongsTo(models.List, { foreignKey: 'listId' });
    };
  
    return Task;
}