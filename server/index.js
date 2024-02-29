const express = require("express");
const app = express();
const db = require("./models");
const List = db.list;
const Task = db.task;
const User = db.user;
const mysql = require("mysql2")
const listRouter = require("./routes/list.route");
const userData = require("./data/user.data");
const listData = require("./data/list.data");

app.use(express.json());

// Association
User.hasMany(List, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
});
List.belongsTo(User, {
    foreignKey: {
      name: "userId",
      allowNull: false,
    },
});
List.hasMany(Task, {
  foreignKey: {
    name: "listId",
    allowNull: false,
  }
});
Task.belongsTo(List, {
  foreignKey: {
    name: "listId",
    allowNull: false,
  }
});

// connect to database
db.sequelize.sync({force: true}).then(() => {
  console.log("initialize data")
}).then(() => {
  userData.initial(User);
})


app.use("/api/list", listRouter);
app.listen(2222, () => {
  console.log("connected to server!")
})