import { NavLink } from "react-router-dom";

export function NavBar() {
    const token = localStorage.getItem("token");

    return(
        <div>
            {token === null ? (
                <>
                    <NavLink to={"/"}>Homepage</NavLink>
                    <NavLink to={"/sign-up"}>Sign up</NavLink>
                </>
            ) : (
                <>
                    <NavLink to={"/"}>Homepage</NavLink>
                </>
            )}
        </div>
    )
}