    import User from "../models/User.js"

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        delete user.password
        res.status(203).json(user)
    } catch (err) { res.status(501).json({err: err.message})}
}