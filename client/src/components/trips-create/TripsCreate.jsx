import { useActionState } from "react";
import { useNavigate } from "react-router";
import { useCreateTrip } from "../../api/tripsApi";
import { useUserContext } from "../../context/UserContext";
import "./TripsCreate.css";

export default function CreateTrip() {
    const navigate = useNavigate();
    const { createTrip } = useCreateTrip();
    const { _id } = useUserContext();

    const [formState, formAction] = useActionState(async (state, formData) => {
        const tripData = Object.fromEntries(formData);
        tripData.creator = _id;
        tripData.participants = [];

        const startDate = new Date(tripData.startDate);
        const endDate = new Date(tripData.endDate);

        
        if (endDate <= startDate) {
            return {
                ...state,
                error: "End date must be after start date."
            };
        }

        try {
            await createTrip(tripData);
            navigate("/trips");
        } catch (error) {
            return { error: "Failed to create trip. Please try again." };
        }
    }, {
        title: "",
        destination: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        notes: "",
        error: null
    });

    return (
        <div className="create-trip-container">
            <h2>Create a New Trip</h2>

            {formState.error && <p className="error-message">{formState.error}</p>}

            <form action={formAction}>
                <label htmlFor="title">Trip Title:</label>
                <input type="text" name="title" required />

                <label htmlFor="destination">Destination:</label>
                <input type="text" name="destination" required />

                <label htmlFor="startDate">Start Date:</label>
                <input type="date" name="startDate" defaultValue={formState.startDate} required />

                <label htmlFor="endDate">End Date:</label>
                <input type="date" name="endDate" defaultValue={formState.endDate} required />

                <label htmlFor="notes">Notes (optional):</label>
                <textarea name="notes" placeholder="Any additional notes..."></textarea>

                <button type="submit" className="create-button">Create Trip</button>
            </form>
        </div>
    );
}
