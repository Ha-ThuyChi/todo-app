import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import config from "../config";
import { Link } from "react-router-dom";


async function fetchList(userId, token, setLists) {
    try {
        const response = await fetch(config.serverLink + `/api/list/view/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 401) {
            localStorage.removeItem("token")
        }
        if (!response.ok) {
            console.error("error:", response.status);
        }
        const result = await response.json();
        console.log(result)
        setLists(result.message[0]);
    } catch (error) {
        console.log(error)
    }
}
export function Homepage() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [lists, setLists] = useState(null);

    useEffect(() => {
        fetchList(userId, token, setLists);
    }, [])
    return (
        <>
            <NavBar/>
            <h1>Homepage</h1>
                <h2>Your lists</h2>
                {lists != null && Object.keys(lists).length > 0 ? (
                    <ul>
                        <li>Name of list: {lists["name"]}</li>
                        <li><Link to={`/view-task/${lists["id"]}`}>View tasks in list</Link></li>
                    </ul>
                ) : (
                    <>
                        {token === null ? (
                            <>
                                <Link to={"/sign-in"}>Sign in</Link> or <Link to={"/sign-up"}>Sign up</Link>
                            </>
                        ) : (
                            <p>No list to display.</p>
                        )}
                    </>
                )}
        </>
    )
}