const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const List = db.list;
const Task = db.task;
const User = db.user;
const listRouter = require("./routes/list.route");
const userRouter = require("./routes/user.route");
const taskRouter = require("./routes/task.route");
const userData = require("./data/user.data");
const listData = require("./data/list.data");
const taskData = require("./data/task.data");

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
User.hasMany(Task, {
  foreignKey: {
    name: "assigneeId",
    allowNull: true,
  }
});
Task.belongsTo(User, {
  foreignKey: {
    name: "assigneeId",
    allowNull: true,
  }
})

// connect to database
async function syncModel() {
  try {
    await db.sequelize.drop();
    await User.sync({alert: true});
    console.log('User model synchronized successfully.');
    await List.sync({alert: true});
    console.log('List model synchronized successfully.');
    await Task.sync({alert: true});
    console.log('Task model synchronized successfully.');
    // Initialize data
    userData.initial(User);
    listData.initial(List);
    taskData.initial(Task);
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}
syncModel();

//middleware 
app.use(bodyParser.json());
app.use(cors());

//routes
app.use("/api/list", listRouter);
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);

//connect
app.listen(2222, () => {
  console.log("connected to server!")
})