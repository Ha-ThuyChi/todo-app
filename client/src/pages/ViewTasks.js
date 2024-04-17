import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import config from "../config";
import { AssignTask } from "./AssignTask";
import { CreateTask } from "./CreateTask";

//fetch tasks
async function fetchTasks(listId, setTasks, token) {
    try {
        const response = await fetch(config.serverLink + `/api/task/view/${listId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        };
        if (!response.ok) {
            console.error("error:", response.status);
        }
        const result = await response.json();
        console.log(result.message)
        setTasks(result.message);
    } catch (error) {
        console.error("error: ", error.message);
    }
};
//delete task
async function deleteTask(taskId, token) {
    return fetch(config.serverLink + `/api/task/delete-assignee/${taskId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            console.error(error.message);
        });      
};
//change status of the task
async function changeStatus(token, values) {
    return fetch(config.serverLink + `/api/task/update-task-status`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(values)
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            console.error(error.message);
        });      
};


export function ViewTask() {
    const listId = useParams().listId;
    const token = localStorage.getItem("token");
    const [tasks, setTasks] = useState(""); 
    const [showAssignTask, setShowAssignTask] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [taskId, setTaskId] = useState(null);

    useEffect(() => { 
        fetchTasks(listId, setTasks, token);
    }, []);
    async function handleDelete(e, taskId) {
        e.preventDefault();
        const response = await deleteTask(taskId, token);
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else if (response.status === 400) {
            console.log(response.message);
        } else {
            alert("Remove assignee successfully.");
            window.location.reload();
        };
    }
    function triggerAssignTask( taskId) {
        setShowAssignTask(!showAssignTask);
        setTaskId(taskId);
    }
    function triggerCreateTask() {
        setShowCreateTask(!showCreateTask);
    }

    async function handleChangeStatus(taskId, status) {
        const response = await changeStatus(token, {
            taskId,
            status
        });
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else if (response.status === 400) {
            console.log(response.message);
        } else {
            alert(response.message);
            window.location.reload();
        };
    };
    return (
        <div>
            <NavBar/>
            <h1>Tasks</h1>
            {tasks != null && tasks.length > 0 ? (
                tasks.map((task) => {
                    return (
                        <ul>
                            <li>Name: {task["name"]}</li>
                            <li>Priority Level: <span class={task["priorityLevel"]}>{task["priorityLevel"]}</span></li>
                            {task["user"] != null ? (
                                <div>
                                    <li>Assignee: {task["user"]["name"]} <button onClick={e => handleDelete(task["id"])}>Remove</button></li>
                                </div>
                            ) : (
                                <div>
                                    <li>Assignee: <button onClick={e => triggerAssignTask(task["id"])}>Assign Task</button></li>
                                    {showAssignTask && taskId === task["id"] && <AssignTask taskId = {task["id"]} />}
                                </div>
                            )}
                            <li>Due date: {task["dueDate"].split("T")[0]}</li>
                            <li>Status: {task["isComplete"] ? "Compeleted" : "Incompleted"} <button onClick={e => handleChangeStatus(task["id"], !task["isComplete"])}>Update status</button></li> 
                        </ul>
                    )
                })
            ) : (
                <p>No task to display.</p>
            )}
            <button onClick={triggerCreateTask}>Create new task</button>
            {showCreateTask && <CreateTask/>}
        </div>
    )
}