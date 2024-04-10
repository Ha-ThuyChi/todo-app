import { useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import config from "../config";
import { AssignTask } from "./AssignTask";
import { CreateTask } from "./CreateTask";

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

async function deleteTask(taskId, token) {
    return fetch(config.serverLink + `/api/task/delete-assignee/${taskId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {
            return response.json();
        }).catch((error) => {
            alert(error.message);
        });
        
}

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
    function triggerAssignTask(e, taskId) {
        setShowAssignTask(!showAssignTask);
        setTaskId(taskId);
    }
    function triggerCreateTask(e) {
        setShowCreateTask(!showCreateTask);
    }
    return (
        <div>
            <NavBar/>
            <h1>Tasks of list </h1>
            {tasks != null && tasks.length > 0 ? (
                tasks.map((task) => {
                    return (
                        <ul>
                            <li>Name: {task["name"]}</li>
                            <li>Priority Level: <span class={task["priorityLevel"]}>{task["priorityLevel"]}</span></li>
                            {task["user"] != null ? (
                                <div>
                                    <li>Assignee: {task["user"]["name"]} <button onClick={e => handleDelete(e, task["id"])}>Remove</button></li>
                                </div>
                            ) : (
                                <div>
                                    <li>Assignee: <button onClick={e => triggerAssignTask(e, task["id"])}>Assign Task</button></li>
                                    {showAssignTask && taskId === task["id"] && <AssignTask taskId = {task["id"]} />}
                                </div>
                            )}
                            <li>Due date: {task["dueDate"].split("T")[0]}</li>
                            <li>Status: {task["isComplete"] ? "Compeleted" : "Incompleted"}</li>
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