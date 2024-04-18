import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import config from "../config";
import { EditUseInfo } from "./EditUserInfo";
import { Link, useNavigate } from "react-router-dom";

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


export function ViewUserInfo() {
    const [userInfo, setUserInfo] = useState(null);
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    
    useEffect(() => {
        fetchUserInfo(token, userId, setUserInfo);
    }, [])
    function handleShowEdit() {
        navigate("/edit-my-profile");
    };
    // function handleChangePassword() {
    //     alert("You need to sign in first.")
    //     navigate("/change-password");
    // }
    return (
        <div>
            <NavBar/>
            <h1>My Profile</h1>
            {userInfo != null && token !== null ? (
                <div>
                    <ul>
                        <li>Name: {userInfo.name}</li>
                        <li>DOB: {userInfo.dob.split("T")[0]}</li>
                        <li>Email: {userInfo.email}</li>
                        <li>Password: *********</li>
                    </ul>
                    <button onClick={handleShowEdit}>Edit</button><br/>
                    {/* <button onClick={handleChangePassword}>Change my password</button> */}
                </div>
            ) : (
                <div>
                    You need to <Link to={"/sign-in"}>Sign in</Link> or <Link to={"/sign-up"}>Sign up</Link> to use this website.
                </div>
            )}
        </div>
    )
}