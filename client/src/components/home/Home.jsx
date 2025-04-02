import { Link } from "react-router";
import "./Home.css"

export default function Home() {
    return (
        <main className="home">
            <section className="hero">
                <h1>Plan, Explore, Share - Your Next Adventure Starts Here!</h1>
                <p>Join TravelMate to create, explore, and share your journey with like-minded travelers.</p>
                <Link to="/trips/create" className="cta-button">Start Planning</Link>
            </section>
            
            <section className="features">
                <div className="feature-card">
                    <h2>Plan Your Trip</h2>
                    <p>Craft and customize your perfect travel itinerary with ease.</p>
                    <Link to="/trips/create">Go to Planner</Link>
                </div>
                <div className="feature-card">
                    <h2>Read & Share Blogs</h2>
                    <p>Get inspired by fellow travelers and share your own experiences.</p>
                    <Link to="/blog">Go to Blog</Link>
                </div>
                <div className="feature-card">
                    <h2>Find Your Next Trip</h2>
                    <p>Connect with like-minded adventurers and explore the world together.</p>
                    <Link to="/trips">Find a Trip to Join</Link>
                </div>
            </section>
        </main>
    );
}