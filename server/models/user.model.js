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
            validate: {
                isEmail: true, 
            },
        },
        password: {
            type: Sequelize.STRING,
        },

    },
    {
        tableName: "users", 
        timeStamps: true,
    });
    return User;
}