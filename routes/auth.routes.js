const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")

const saltRounds = 10


//CREATE USER

//SIGNUP

router.post('/signup', (req, res, next) => {

    const { email, password, username } = req.body


    User
        .findOne({ email })
        .then(foundUser => {

            if (foundUser) {
                res.status(400).json({ message })
            }
            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ email, password: hashedPassword, username })

        })
        .then((createdUser) => {
            const { email, username, _id } = createdUser
            const user = { email, username, _id }

            res.status(201).json({ user })
        })
        .catch(err => {
            console.log(err)
            res.status(500).jason({ message: "Error" })
        })


})

router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." });
        return;
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username } = foundUser

                const payload = { _id, email, username }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )

                res.status(200).json({ authToken });
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" });
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: "Internal Server Error" })
        })
})


router.get('/verify', isAuthenticated, (req, res, next) => {
    res.status(200).json(req.payload)
})


//EDIT USER

router.put('/edit', isAuthenticated, (req, res) => {

    const { id } = req.payload
    console.log('helluuu')
    // const { firstName, lastName, telephone } = req.body

    // User
    //     .findByIdAndUpdate(id, { firstName, lastName, telephone }, { new: true })
    //     .then(response => res.json(response))
    //     .catch(err => res.status(500).json(err))
})

//EDIT IMAGE

// router.put('/edit-image', isAuthenticated, (req, res) => {

//     const { id } = req.payload
//     const { profileImg } = req.body

//     User
//         .findByIdAndUpdate(id, { profileImg }, { new: true })
//         .then(response => res.json(response))
//         .catch(err => res.status(500).json(err))
// })


module.exports = router