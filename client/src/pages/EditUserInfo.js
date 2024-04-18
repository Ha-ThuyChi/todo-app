import { useEffect, useState } from "react";
import config from "../config";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

async function editUser(token, values) {
    try {
        const response = await fetch(config.serverLink + `/api/user/edit-user`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        };
        if (!response.ok) {
            console.error("error:", response.status);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};
async function fetchUserInfo(token, userId, setUserInfo) {
    try {
        const response = await fetch(config.serverLink + `/api/user/get-user-by-id/${userId}`, {
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
        setUserInfo(result.message);
    } catch (error) {
        console.error(error);
    }
};

export function EditUseInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo(token, userId, setUserInfo);
    }, [])
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setDob(userInfo.dob.split("T")[0]);
            setEmail(userInfo.email);
            setPassword("******");
        };
    }, [userInfo])
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await editUser(token, {
            userId,
            name,
            dob,
            email,
            password
        });
        if (response.success) {
            alert(response.message);
            navigate("/view-my-profile");
        };
        if (response.message === "Validation error") {
            alert("Email is invalid.")
        } else {
            alert(response.message)
        };
    }
    return (
        <div>
            <NavBar/>
            <h1>Edit Profile</h1>
            {userInfo && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name: </label><br/>
                            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}></input><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of birth:</label><br/>
                            <input type="date" name="dob" value={dob} onChange={e => setDob(e.target.value)}></input><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label><br/>
                            <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required></input><br/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label><br/>
                            <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} readOnly></input><br/>
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    )
}