import UserModel from "../Models/userModel.js"
import bcrypt from 'bcrypt'


// registering a new user

export const registerUser = async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password = hashedPass
    const newUser = new UserModel(req.body)
    const {username} = req.body
    try {
        const oldUser = await UserModel.findOne({username})
        if(oldUser){
            return res.status(400).json({message:"username is already registered!"})
        }
        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

// login User

export const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await UserModel.findOne({username: username})

        if(user){
            const validity = await bcrypt.compare(password, user.password)

            validity? res.status(200).json(user): res.status(400).json("Wrong password")
        }
        else{
            res.status(404).json("User does not exists")
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}