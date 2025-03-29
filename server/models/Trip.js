import { Schema, Types } from "mongoose";


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
        
    }],

    notes: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        required: true
    },
})