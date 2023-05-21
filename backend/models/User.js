import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    channelName: { // channel name visible to public
        type: String,
        required: true,
        min: 2,
        max: 30,
        unique: true
    },
    username: { // for sign in
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
        max: 30,
    },

}, { timestamps: true});

export default mongoose.model('User', UserSchema)
