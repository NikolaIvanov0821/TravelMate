import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "./TripsEdit.css";
import { useGetOneTrip, useUpdateTrip } from "../../api/tripsApi";
import { useUserContext } from "../../context/UserContext";

export default function EditTrip() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { _id } = useUserContext();
    const { getOneTrip } = useGetOneTrip();
    const { updateTrip } = useUpdateTrip();

    const [trip, setTrip] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const data = await getOneTrip(id);
                if (!data) throw new Error("Trip not found");
                if (data.creator !== _id) {
                    navigate("/trips"); // Redirect if not the owner
                    return;
                }
                setTrip(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrip();
    }, [id, _id, navigate]);

    if (isLoading) return <p>Loading trip details...</p>;
    if (error) return <p className="error">{error}</p>;
    if (!trip) return <p>Trip not found.</p>;

    // ✅ Correct way to handle the form
    async function handleForm(formData) {
        const updatedData = Object.fromEntries(formData);
        await updateTrip(id, updatedData);
        navigate(`/trips/${id}`); // Redirect to updated trip details
    }

    return (
        <div className="edit-trip-container">
            <h2>Edit Trip</h2>
            <form action={handleForm}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={trip.title} required />

                <label htmlFor="destination">Destination:</label>
                <input type="text" name="destination" defaultValue={trip.destination} required />

                <label htmlFor="startDate">Start Date:</label>
                <input type="date" name="startDate" defaultValue={trip.startDate.split("T")[0]} required />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" name="endDate" defaultValue={trip.endDate.split("T")[0]} required />

                <label htmlFor="notes">Notes:</label>
                <textarea name="notes" defaultValue={trip.notes}></textarea>

                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
}