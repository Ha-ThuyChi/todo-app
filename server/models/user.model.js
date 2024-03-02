module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
        },
        dob: {
            type: Sequelize.DATE,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },

    },
    {
        tableName: "users", 
        timeStamps: true,
    });
    User.associate = (models) => {
        User.hasMany(models.List, {foreignKey: "userId"})
    }
    User.associate = (models) => {
        User.hasOne(models.Task, {foreignKey: "assigneeId"})
    }
    return User;
}