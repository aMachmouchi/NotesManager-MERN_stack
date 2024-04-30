import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        tags: [{
            type: String,
            trim: true,
        }]
    }
);

export const Note = mongoose.model('Cat', noteSchema);