import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useGetAllTrips } from "../../api/tripsApi";
import { useUserContext } from "../../context/UserContext";
import "./Trips.css";

export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getAllTrips, getAllTripsByUser } = useGetAllTrips();
    const { _id } = useUserContext();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        async function fetchTrips() {
            try {
                const allTrips = await getAllTrips();
                allTrips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sort by start date
                setTrips(allTrips);

                if (_id) {
                    const myTrips = await getAllTripsByUser(_id);
                    setUserTrips(myTrips);
                }
            } catch (err) {
                setError("Failed to load trips.");
            } finally {
                setLoading(false);
            }
        }

        fetchTrips();
    }, [_id]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="trips-container">
            <h2 className="trips-title">Explore Trips</h2>

            {_id && (
                <Link to="/trips/create" className="create-trip-button">
                    + Create Trip
                </Link>
            )}

            {userTrips.length > 3 && (
                <Link to={`/profile/${_id}`} className="my-trips-button">
                    View My Trips
                </Link>
            )}

            <div className="trips-grid">
                {trips.map((trip) => (
                    <div 
                        key={trip._id} 
                        className={`trip-card ${trip.creator === _id ? "my-trip" : ""} ${trip.participants.includes(_id) ? "participant" : ""}`}
                    >
                        <div className="trip-info">
                            <h3>{trip.title}</h3>
                            <p><strong>Destination:</strong> {trip.destination}</p>
                            <p>
                                <strong>Dates:</strong> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                            </p>
                            {trip.notes && <p className="trip-notes"><strong>Notes:</strong> {trip.notes.slice(0, 50)}...</p>}
                            <Link to={`/trips/${trip._id}`} className="details-link">View Details</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}