import { useState } from "react";
import config from "../config";
import { useParams } from "react-router-dom";

async function createTask(token, values) {
    return await fetch(config.serverLink + "/api/task/create-task", {
        method: "POST", 
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    }).then((result) => {
        return result.json();
    }).catch(error => {
        console.error(error);
    });
};

export function CreateTask() {
    const [name, setName] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [priorityLevel, setPriorityLevel] = useState(null);
    const [assigneeEmail, setAssigneeEmail] = useState(null);
    const token = localStorage.getItem("token");
    const listId = useParams().listId;
    
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await createTask(token, {
            name,
            dueDate,
            priorityLevel,
            assigneeEmail,
            listId
        });
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else if (response.status === 400) {
            console.log(response.message);
        };
        if (response.success) {
            alert("Task is created.");
            window.location.reload();
        } else {
            alert(response.message);
        };
                
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name of task: </label>
                <input type="text" name="name" value={name} placeholder="Enter the task name" onChange={e => setName(e.target.value)}></input><br/>
                <label htmlFor="dueDate">Due date: </label>
                <input type="date" name="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)}></input><br/>
                <label>Priority level: </label><br/>
                <label htmlFor="Low">
                    <input 
                        type="radio" 
                        value="Low"
                        checked = {priorityLevel === "Low"}
                        onChange={e => setPriorityLevel(e.target.value)}
                    />
                    Low
                </label><br/>
                <label htmlFor="Medium">
                    <input 
                        type="radio" 
                        value="Medium"
                        checked = {priorityLevel === "Medium"}
                        onChange={e => setPriorityLevel(e.target.value)}
                    />
                    Medium
                </label><br/>
                <label htmlFor="High">
                    <input 
                        type="radio" 
                        value="High"
                        checked = {priorityLevel === "High"}
                        onChange={e => setPriorityLevel(e.target.value)}
                    />
                    High
                </label><br/>
                
                <label htmlFor="assigneeEmail">Enter assignee email: </label>
                <input type="email" name="assigneeEmail" value={assigneeEmail} placeholder="Enter assignee email" onChange={e => setAssigneeEmail(e.target.value)}></input><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

