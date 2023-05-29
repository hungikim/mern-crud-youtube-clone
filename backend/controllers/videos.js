import Video from '../models/Video.js'

export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find()
        res.status(200).json(videos)
    } catch (err) {res.status(502).json({err: err.message})}
}

export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.videoId)
        video.views = video.views + 1
        await video.save()
        res.status(200).json(video)
    } catch (err) { res.status(502).json({err: err.message}) }
}

export const postVideo = async (req, res) => {
    try {
        const { user, author, title, videoUrl, desc } = req.body
        const newVideo = new Video({ user, author, title, videoUrl, desc })
        const savedVideo = await newVideo.save()

        res.status(202).json({})
    } catch (err) {res.status(501).json({err: err.message})}
}

export const getUserVideos = async (req, res) => {
    try {
        const userId = req.params.userId
        const userVideos = await Video.find({ user: userId })
        res.status(202).json(userVideos)
    } catch (err) { res.status(502).json({err: err.message}) }
}

export const updateVideo = async (req, res) => {
    try {
        const { userId, title, videoUrl, desc } = req.body
        const video = await Video.findById(req.params.videoId)
        if (video.user != userId) {
            console.log(`User: ${userId}, Author: ${video.user}`)
            return res.status(502).json({err: "User doesn't match the author"})
        }
        else {
            // await update video in moogse
            if (title) video.title = title
            if (videoUrl) video.videoUrl = videoUrl
            if (desc) video.desc = desc
            await video.save()
            res.status(202).json(video)
        }
    } catch (err) { res.status(503).json({err: err.message}) }
}
export const deleteVideo = async (req, res) => {
    try {
        const user = req.body.user
        const video = await Video.findById(req.params.videoId)
        if (video.user != user._id) {
            console.log(`User: ${user._id}, Author: ${video.user}`)
            return res.status(502).json({err: "User doesn't match the author"})
        }
        else {
            await video.deleteOne()
            res.status(202).json({})
        }
    } catch (err) { res.status(502).json({err: err.message}) }
}