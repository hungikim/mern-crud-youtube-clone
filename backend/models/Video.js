import mongoose from 'mongoose'

const VideoSchema = mongoose.Schema({
    user: { // Reference to user row
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: { // video title
        type: String,
        required: true,
        min: 2,
        max: 40
    },
    author: { // user's channel name
        type: String,
        required: true
    },
    videoUrl: { // link to YT video
        type: String,
        required: true
    },
    desc: String,
    views: {
        type: Number,
        default: 0
    },
}, {timestamps:true} )

export default mongoose.model('Video', VideoSchema)
