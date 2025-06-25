import { Link, Outlet } from "react-router-dom";

export default function Layout() {
    return <>
        <Link to="/">Auth</Link>
        <Link to="/signup">Sign Up</Link>
        <br/>
        <Outlet />

    </>;
}