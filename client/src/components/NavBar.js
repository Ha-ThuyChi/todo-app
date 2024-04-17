import { NavLink, useNavigate } from "react-router-dom";
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
        <div>
            {token === "" ? (
                <>
                    <NavLink to={"/"}>Homepage</NavLink>
                    <NavLink to={"/sign-up"}>Sign up</NavLink>
                    <NavLink to={"/sign-in"}>Sign in</NavLink>
                </>
            ) : (
                <>
                    <NavLink to={"/"}>Homepage</NavLink>
                    <button onClick={handleSignout}>Sign out</button>
                </>
            )}
        </div>
    )
}