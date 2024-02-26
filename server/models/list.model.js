const User = require("./user.model");

module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("list", {
        name: {
            type: Sequelize.STRING,
        },
        type: {
            type: Sequelize.STRING,
        },
        ownerId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: User, 
                key: 'id', 
            },
        }
    },
    {
        tableName: "lists", 
        timeStamps: true,
    });
  
    return List;
}