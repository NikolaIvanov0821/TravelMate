import { Link } from "react-router";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} TravelMate - All Rights Reserved</p>
            <nav className="footer-nav">
                <Link to="/terms" className="footer-link">Terms of Service</Link>
                <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                <Link to="/contact" className="footer-link">Contact Us</Link>
            </nav>
        </footer>
    );
}