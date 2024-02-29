const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
        name: {
            type: Sequelize.STRING,
        },
        userId: {
            type: Sequelize.STRING,
            references: {
                model: User,
                key: "id",
            }
        }
    },
    {
        tableName: "lists", 
        timestamps: true,
    });
    return List;
}