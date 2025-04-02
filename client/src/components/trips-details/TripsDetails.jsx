import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import "./TripsDetails.css";
import { useGetOneTrip, useUpdateTrip, useDeleteTrip } from "../../api/tripsApi";
import { useUserContext } from "../../context/UserContext";

export default function TripsDetails() {
    const { id } = useParams();
    const { _id } = useUserContext();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getOneTrip } = useGetOneTrip();
    const { updateTrip } = useUpdateTrip();
    const { deleteTrip } = useDeleteTrip();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const data = await getOneTrip(id);
                setTrip(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    const handleJoinLeave = async () => {
        const updatedTrip = { ...trip };
        
        if (updatedTrip.participants.includes(_id)) {
            updatedTrip.participants = updatedTrip.participants.filter(p => p !== _id);
        } else {
            updatedTrip.participants.push(_id);
        }

        await updateTrip(id, updatedTrip);
        setTrip(updatedTrip);
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this trip?")) {
            await deleteTrip(id);
            navigate('/trips');
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!trip) return <p className="error">Trip not found.</p>;

    return (
        <div className="trip-details-container">
            <Link to="/trips" className="back-to-trips">← Back to Trips</Link>
            <h2 className="trip-title">{trip.title}</h2>
            <p className="trip-destination">Destination: {trip.destination}</p>
            <p className="trip-dates">
                📅 {new Date(trip.startDate).toDateString()} - {new Date(trip.endDate).toDateString()}
            </p>
            <p className="trip-notes">{trip.notes || "No additional notes."}</p>

            <div className="trip-participants">
                <h3>Participants:</h3>
                <ul>
                    {trip.participants.length > 0 ? trip.participants.map((p, index) => (
                        <li key={index}>{p}</li>
                    )) : <p>No participants yet.</p>}
                </ul>
            </div>

            {_id === trip.creator ? (
                <div className="trip-owner-actions">
                    <Link to={`/trips/edit/${id}`} className="edit-button">Edit</Link>
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                </div>
            ) : (
                <button onClick={handleJoinLeave} className="join-leave-button">
                    {trip.participants.includes(_id) ? "Leave Trip" : "Join Trip"}
                </button>
            )}
        </div>
    );
}
