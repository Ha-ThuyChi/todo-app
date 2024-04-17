import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import config from "../config";
import { Link, Outlet } from "react-router-dom";
import { CreateList } from "./CreateList";


async function fetchList(userId, token, setLists) {
    try {
        const response = await fetch(config.serverLink + `/api/list/view/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        };
        if (!response.ok) {
            console.error("error:", response.status);
        }
        const result = await response.json();
        console.log(result)
        setLists(result.message);
    } catch (error) {
        console.log(error)
    }
};

async function deleteList(token, listId) {
    return await fetch(config.serverLink + "/api/list/delete-list/" + listId, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        alert(error.message);
    });
}

export function Homepage() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const [lists, setLists] = useState(null);
    const [showCreateList, setShowCreatList] = useState(false);

    useEffect(() => {
        fetchList(userId, token, setLists);
    }, []);

    async function handleDeleteList(listId) {
        const response = await deleteList(token, listId);
        if (response.success) {
            alert(response.message)
            window.location.reload();
        };
        if (response.status === 401) {
            localStorage.clear();
            window.location.reload();
        } else if (response.status === 400) {
            console.log(response.message);
        };
    };
    function handleShowCreateList() {
        setShowCreatList(!showCreateList);
    }

    return (
        <>
            <NavBar/>
            <h1>Homepage</h1>
                {lists != null && Object.keys(lists).length > 0 ? (
                    <div>
                        <h2>Your lists</h2>
                        {lists.map(list => {
                            return (
                                <div>
                                    <ul>
                                        <li>Name of list: {list["name"]} <button onClick={e => handleDeleteList(list["id"])}>Delete</button><br/>
                                        <Link to={`/view-task/${list["id"]}`}>View tasks in list</Link></li>
                                    </ul>
                                </div>
                            )
                        })}
                        <button onClick={handleShowCreateList}>Create new list</button>
                        {showCreateList && <CreateList/>}
                    </div>
                ) : (
                    <>
                        {token === null ? (
                            <>
                                You need to <Link to={"/sign-in"}>Sign in</Link> or <Link to={"/sign-up"}>Sign up</Link> to use this website.
                            </>
                        ) : (
                            <div>
                                <p>No list to display.</p>
                                <button onClick={handleShowCreateList}>Create new list</button>
                                {showCreateList && <CreateList/>}
                            </div>
                        )}
                    </>
                )}
        </>
    )
}