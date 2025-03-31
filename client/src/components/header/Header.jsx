import { Link } from "react-router";
import "./Header.css"
import useAuth from "../../hooks/useAuth";

export default function Header() {
    const { isAuthenticated } = useAuth();
    return (
        <>
            <header className="header">
                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    {
                        isAuthenticated
                            ? <div id="user">
                                <Link to="/planner" className="nav-link">Planner</Link>
                                <Link to="/logout" className="nav-link">Logout</Link>
                                <Link to="/profile" className="nav-link">Profile</Link>
                            </div>
                            : <div id="guest">
                                <Link to="/blog" className="nav-link">Blog</Link>
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </div>
                    }
                </nav>
            </header>
        </>
    )
}