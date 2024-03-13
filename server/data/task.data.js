module.exports = {
    initial: function (Task) {
        Task.create({
            name: "Update Journal everyday",
            dueDate: "2024-11-11",
            isComplete: true,
            listId: 2,
            priorityLevel: "High",
            assigneeId: null,
        });
        Task.create({
            name: "Update Journal monthly",
            dueDate: "2024-11-11",
            isComplete: false,
            listId: 4,
            priorityLevel: "Low",
            assigneeId: 1,
        });
        Task.create({
            name: "Update Journal yearly",
            dueDate: "2024-11-11",
            isComplete: true,
            listId: 3,
            priorityLevel: "Medium",
            assigneeId: 2,
        });
        Task.create({
            name: "Update Journal centurly",
            dueDate: "2024-11-11",
            isComplete: false,
            listId: 2,
            priorityLevel: "Low",
            assigneeId: 3,
        });
        Task.create({
            name: "Delete Journal",
            dueDate: "2024-11-11",
            isComplete: true,
            listId: 3,
            priorityLevel: "High",
            assigneeId: 4,
        });
        Task.create({
            name: "View Journal",
            dueDate: "2024-11-11",
            isComplete: false,
            listId: 2,
            priorityLevel: "Medium",
            assigneeId: 3,
        });
    }
}
