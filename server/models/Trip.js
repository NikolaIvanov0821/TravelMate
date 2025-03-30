import { Schema, Types, model } from "mongoose";

const tripSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },

    participants: [{
        type: Types.ObjectId,
        ref: 'User'
    }],

    notes: {
        type: String,
        required: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

// tripSchema.pre('save', () => {
//     this.createdAt = Date.now();
// });

const Trip = model('Trip', tripSchema);

export default Trip;