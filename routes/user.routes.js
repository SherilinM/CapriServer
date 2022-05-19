const router = require('express').Router()
const User = require('../models/User.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")
const Commerce = require('../models/Commerce.model')
const { response } = require('express')


//GET USER INFO

router.get("/", isAuthenticated, (req, res) => {

    const { _id } = req.payload

    User
        .findById(_id)
        .populate('favCommerce')
        .then(response => {
            res.json(response)
        })
        .catch(err => res.status(500).json(err))

})

//EDIT USER

router.put('/edit', isAuthenticated, (req, res) => {

    const { _id } = req.payload

    const { firstName, lastName, telephone } = req.body

    User
        .findByIdAndUpdate(_id, { firstName, lastName, telephone }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//DELETE USER

router.delete("/:id/delete", (req, res) => {
    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


//ADD COMMERCES TO FAV

router.put('/:commerceId/add-to-fav', isAuthenticated, (req, res) => {
    const { commerceId: favCommerce } = req.params
    const { _id } = req.payload



    User
        .findByIdAndUpdate(_id, { $addToSet: { favCommerce } }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})


//REMOVE COMMERCES FROM FAV

router.put('/:commerceId/remove-from-fav', isAuthenticated, (req, res) => {
    const { commerceId: favCommerce } = req.params
    const { _id } = req.payload


    User
        .findByIdAndUpdate(_id, { $pull: { favCommerce } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


//GET ALL COMMERCES
router.get("/commerces", isAuthenticated, (req, res) => {

    const { _id } = req.payload

    Commerce
        .find({ owner: _id })
        .populate('commerce')
        .then(response => res.json(response))
        .catch(err => res.statusMessage(500).json(err))
})

module.exports = router