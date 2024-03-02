const User = require("./user.model");
const Task = require("./task.model")
module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
        name: {
            type: Sequelize.STRING,
        }
    },
    {
        tableName: "lists", 
        timestamps: true,
    });
    List.associate = (models) => {
        List.belongsTo(models.User, { foreignKey: 'userId' });
    };
    List.associate = (models) => {
        List.hasMany(models.Task, { foreignKey: 'listId' });
    };
    return List;
}