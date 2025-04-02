import { Link } from "react-router";
import "./Header.css"
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Header() {
    const { isAuthenticated } = useAuth();
    const { _id } = useContext(UserContext);
    
    return (
        <>
            <header className="header">

                <div className="logo-section">
                    <img src="/sitelogo.png" alt="" />
                    <h3>TravelMate</h3>
                </div>
                <nav className="nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/blog" className="nav-link">Blog</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    {
                        isAuthenticated
                            ? <div id="user">
                                <Link to="/trips" className="nav-link">Trips</Link>
                                <Link to="/trips/create" className="nav-link">Planner</Link>
                                <Link to="/logout" className="nav-link">Logout</Link>
                                <Link to={"/profile/" + _id} className="nav-link">Profile</Link>
                            </div>
                            : <div id="guest">
                                <Link to="/login" className="nav-link">Login</Link>
                                <Link to="/register" className="nav-link">Register</Link>
                            </div>
                    }
                </nav>
            </header>
        </>
    )
}