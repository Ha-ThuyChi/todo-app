import { useState } from "react";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";

async function assignTask(token, values) {
    return await fetch(config.serverLink + "/api/task/assign-task", {
        method: "POST",
        headers: {
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    }).then((result) => {
        return result.json();
    }).catch(error => {
        console.error(error);
    });
}

export function AssignTask() {
    const [email, setEmail] = useState("");
    const token = localStorage.getItem("token");
    const taskId = useParams().taskId;
    const navigate = useNavigate();

    async function handleSubmit (e) {
        e.preventDefault();
        const response = await assignTask(token, {
            email,
            taskId
        });
        if (response.success) {
            alert("Task is assigned successfully.");
            window.location.reload();
        } else {
            alert(response.message);
        };
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter the email of assignee: </label><br/>
                <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}></input><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}