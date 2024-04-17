import { useState } from "react";
import config from "../config";
import { NavBar } from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";

async function createUser(values) {
    return fetch(config.serverLink + "/api/user/create-user", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(values)
    }).then((data) => {
        return data.json()
    }).catch(error => {
        console.error(error);
    })
}

export function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await createUser({
            email,
            name,
            dob,
            password
        });
        if (response.success) {
            alert("Your account is created successfully!");
            navigate("/sign-in");
        };
        
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else if (response.status === 400) {
            console.log(response.message);
        };
    }

    return(
        <div>
            <NavBar/>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Full name:</label>
                <input type="text" name="name" value={name} placeholder="Enter the name" onChange={e => setName(e.target.value)}></input><br/>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={email} placeholder="Enter the email" onChange={e => setEmail(e.target.value)}></input><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={password} placeholder="Enter the password" onChange={e => setPassword(e.target.value)}></input><br/>
                <label htmlFor="dob">Date of birth:</label>
                <input type="date" name="dob" value={dob} onChange={e => setDob(e.target.value)}></input><br/>
                <button type="submit">Submit</button>
            </form>
                <Link to={"/sign-in"}>Have an account?</Link>
        </div>
    )
}