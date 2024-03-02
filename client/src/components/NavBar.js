import { NavLink } from "react-router-dom";

export function NavBar() {
    return(
        <div>
            <NavLink to={"/"}>Homepage</NavLink>
            <NavLink to={"/sign-up"}>Sign up</NavLink>
        </div>
    )
}