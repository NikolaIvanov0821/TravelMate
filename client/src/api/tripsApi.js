import request from "../utils/request";

const baseUrl = 'https://travelmate-eh27.onrender.com/trips';

export const useGetAllTrips = () => {
    const getAllTrips = async () => {
        return await request.get(baseUrl);
    }

    const getAllTripsByUser = async (userId) => {
        return await request.get(`${baseUrl}?user=${userId}`);
    }

    return { getAllTrips, getAllTripsByUser }
}

export const useGetOneTrip = () => {
    const getOneTrip = async (tripId) => {
        return await request.get(`${baseUrl}/${tripId}`);
    }

    return { getOneTrip }
}

export const useCreateTrip = () => {
    const createTrip = async (tripData) => {
        return await request.post(baseUrl, tripData);
    }

    return { createTrip }
}

export const useUpdateTrip = () => {
    const updateTrip = async (tripId, tripData) => {
        return await request.put(`${baseUrl}/${tripId}`, tripData);
    }

    return { updateTrip }
}

export const useDeleteTrip = () => {
    const deleteTrip = async (tripId) => {
        return await request.delete(`${baseUrl}/${tripId}`);
    }

    return { deleteTrip }
}