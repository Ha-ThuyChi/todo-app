const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "todoapp",
    "root",
    "root", 
    {
        dialect: "mysql",
        host: "localhost",
    }
);



const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.list = require("./list.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.task = require("./task.model.js")(sequelize, Sequelize);

module.exports = db;