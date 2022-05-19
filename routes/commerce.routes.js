const router = require("express").Router();
const Commerce = require('./../models/Commerce.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware");
const { get } = require("mongoose");



// GET ALL COMMERCES

router.get("/getAllCommerce", (req, res) => {

    Commerce
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// GET ALL COMMERCES OF ONE USER
router.get('/get-my-commerces', isAuthenticated, (req, res) => {
    const { _id } = req.payload

    Commerce
        .find({ owner: _id })
        .then(foundCommerces => res.json(foundCommerces))
        .catch(err => res.status(500).json(err))
})


//CREATE COMMERCES

router.post('/create', isAuthenticated, (req, res) => {
    const { _id: owner } = req.payload

    const { title, description, imageUrl, category, lat, lng } = req.body

    const address = {
        location: {
            type: 'Point',
            coordinates: [lat, lng]
        }
    }

    Commerce
        .create({ owner, title, description, imageUrl, category, address })
        .then(response => res.json(response))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
})


//EDIT COMMERCES

router.put("/:id/edit", (req, res) => {
    const { id } = req.params
    const { title, description, imageUrl, category, address } = req.body

    Commerce
        .findByIdAndUpdate(id, { title, description, imageUrl, category, address }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


//DELETE COMMERCES

router.delete("/:id/delete", (req, res) => {
    const { id } = req.params

    Commerce
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})



//SEARCH COMMERCES

router.get('/search-commerce/:input_text', (req, res) => {
    const { input_text } = req.params

    Commerce
        .find({ title: { $regex: input_text, $options: 'i' } })
        .sort({ title: 1 })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


//LIKE COMMERCE

router.put('/:id/like', (req, res) => {
    const { id } = req.params

    Commerce
        .findByIdAndUpdate(id, { $inc: { like: 1 } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

router.put('/:id/unlike', (req, res) => {
    const { id } = req.params

    Commerce
        .findByIdAndUpdate(id, { $inc: { like: -1 } })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})

// GET ONE COMMERCE

router.get("/:commerceId", (req, res) => {

    const { commerceId } = req.params

    Commerce
        .findById(commerceId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})



module.exports = router