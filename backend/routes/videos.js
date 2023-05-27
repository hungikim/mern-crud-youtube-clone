import express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { getAllVideos, getVideo, updateVideo, deleteVideo, postVideo, getUserVideos } from '../controllers/videos.js'
const router = express.Router()

// url prefix: /videos
router.get('/:videoId', getVideo)
router.delete('/:videoId', verifyToken, deleteVideo)
router.patch('/:videoId', verifyToken, updateVideo)
router.get('/', getAllVideos) // All videos
router.post('/', verifyToken, postVideo) // Post a video
router.get('/user/:userId', getUserVideos) // Specific user's videos

export default router