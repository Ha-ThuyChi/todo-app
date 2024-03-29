import { useNavigate } from "react-router-dom";
import config from "../config";
import { NavBar } from "../components/NavBar";
import { useState } from "react";



async function submitList(values, token) {
    return await fetch(config.serverLink + "/api/list/create-list", {
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
}

export function CreateList() {
    const [name, setName] = useState("");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    async function handleSubmit(e) {
        e.preventDefault();
        const response = await submitList({
            name,
            userId
        }, token);
        console.log(response)
        if (response.success) {
            alert("Your list is created successfully!");
            navigate("/");
        } else {
            alert(response.message)
        }
    }
    return(
        <div>
            <h1>Create List</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full name: </label>
                <input type="text" name="name" value={name} placeholder="Enter the name" onChange={e => setName(e.target.value)}></input><br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}