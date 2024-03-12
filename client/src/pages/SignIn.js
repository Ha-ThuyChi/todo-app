import { NavBar } from "../components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import config from "../config";
import { useState } from "react";

async function fetchUser(values) {
    return await fetch(config.serverLink + "/api/user/get-user", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(values)
    }).then((data) => {
        return data.json()
    }).catch(error => {
        console.error(error);
    })
}

export function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetchUser({
            email,
            password
        });
        console.log(response)
        if (response.success) {
            localStorage.setItem("token", response.message.accessToken);
            localStorage.setItem("userId", response.message.data);
            alert("Sign in successfully!");
            navigate("/")
        } else {
            alert(response.message)
        }

    }
    return(
        <div>
            <NavBar/>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" value={email} placeholder="Enter the email" onChange={e => setEmail(e.target.value)}></input><br/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" value={password} placeholder="Enter the password" onChange={e => setPassword(e.target.value)}></input><br/>
                <button type="submit">Submit</button>
            </form>
            
            <Link to={"/sign-up"}>Don't have an account?</Link>
        </div>
    )
}