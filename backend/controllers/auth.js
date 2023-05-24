import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    try {
        const { username, channelName, password } = req.body

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ username, channelName, password: hashedPassword })
        const savedUser = await newUser.save()
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

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(500).send({ err: "Incorrect Password"})

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETKEY)
        delete user.password
        res.status(202).json({ token, user })
    } catch (err) { res.status(400).json({ err: err.message })}
}