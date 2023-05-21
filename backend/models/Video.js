import mongoose from 'mongoose'

const VideoSchema = mongoose.Schema({
    userId: { // user id of author
        type: String,
        required: true
    },
    title: { // video title
        type: String,
        required: true,
        min: 2,
        max: 40
    },
    author: { // who posted the video (channel name)
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
})

export default mongoose.model('Video', VideoSchema)
