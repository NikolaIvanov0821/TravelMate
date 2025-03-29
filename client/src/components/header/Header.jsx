import { Link } from "react-router";
import "./Header.css"

export default function Header() {
    return (
        <>
            <header className="header">
                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/planner" className="nav-link">Planner</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/register" className="nav-link">Register</Link>
                    <Link to="/logout" className="nav-link">Logout</Link>
                    <Link to="/profile" className="nav-link">Profile</Link>
                </nav>  
            </header>
        </>
    )
}