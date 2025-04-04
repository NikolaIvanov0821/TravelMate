import Trip from "../models/Trip.js"

const tripService = {
    create(trip) {
        return Trip.create(trip);
    },

    getAll(filter = {}) {
        let query = Trip.find({});

        if (filter.user) {
            query = query.where({ creator: filter.user });
        }

        if (filter.participant) {
            query = query.where({ participants: { $in: [filter.participant] } });
        }

        return query;
    },

    getOne(tripId) {
        return Trip.findById(tripId);
    },

    updateTrip(tripId, updatedtrip) {
        return Trip.findByIdAndUpdate(tripId, updatedtrip);
    },

    deleteTrip(tripId) {
        return Trip.findByIdAndDelete(tripId);
    }
}

export default tripService;