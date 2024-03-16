import { Link, Outlet, useParams } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { useEffect, useState } from "react";
import config from "../config";

async function fetchTasks(listId, setTasks, token) {
    try {
        const response = await fetch(config.serverLink + `/api/task/view/${listId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.status === 401) {
            localStorage.removeItem("token")
        }
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


export function ViewTask() {
    const listId = useParams().listId;
    const token = localStorage.getItem("token");
    const [tasks, setTasks] = useState(""); 
    
    useEffect(() => {
        fetchTasks(listId, setTasks, token);
    }, []);

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
                                <li>Assignee: {task["user"]["name"]}</li>
                            ) : (
                                <div>
                                    <li>Assignee: <Link to={`assign-task/${task["id"]}`}>Assign Task</Link></li>
                                    <Outlet/>
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
        </div>
    )
}