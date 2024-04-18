import { NavLink, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
export function NavBar() {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loggined = localStorage.getItem("token");
        if (loggined) {
            const foundToken = loggined;
            setToken(foundToken);
        }
    }, []);

    function handleSignout() {
        setToken("")
        localStorage.clear();
        window.location.reload();
    }
    return(
        <div className="nav-links">
            {token === "" ? (
                <>
                    <NavLink className={"nav-link"} to={"/"}>Homepage</NavLink>
                    <NavLink className={"nav-link"} to={"/sign-up"}>Sign up</NavLink>
                    <NavLink className={"nav-link"} to={"/sign-in"}>Sign in</NavLink>
                </>
            ) : (
                <>
                    <NavLink className={"nav-link"} to={"/"}>Homepage</NavLink>
                    <NavLink className={"nav-link"} to={"/view-my-profile"}>My Profile</NavLink>
                    <button onClick={handleSignout}>Sign out</button><br/>
                </>
            )}
            
        </div>
    )
}