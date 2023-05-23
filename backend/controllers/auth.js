import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, channelName, password } = req.body
        const newUser = new User({ username, channelName, password })
        const savedUser = await newUser.save()
        // TODO: Hash password
        res.status(202).json({})

    } catch(err) {
        console.log(err.message)
        res.status(500).json({err:err.message})
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        
        const user = await User.findOne({ username: username })
        if (!user) return res.status(500).send({ err: "User Not Found" })

        const isMatch = (password === user.password)
        if (!isMatch) return res.status(500).send({ err: "Incorrect Password"})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY)
        delete user.password
        console.log("Logged In")
        console.log(user)
        res.status(202).json({ token, user })
    } catch (err) { res.status(400).json({ err: err.message })}
}