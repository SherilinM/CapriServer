const router = require("express").Router();

const { response } = require("../app");
const Commerce = require('./../models/Commerce.model')


// GET ALL COMMERCES

router.get("/getAllCommerce", (req, res) => {

    Commerce
        .find()
        .then(response => res.json(response))
        .catch(err => res.status(500).jason(err))

})



//CREATE COMMERCES

router.post('/create', (req, res) => {
    // Esto debería ser con el req.payload
    //const { _id } = req.payload

    // para poder testear, se lo pasamos en el req.body
    const { _id, title, description, imageUrl, category, latitude, longitude } = req.body

    const address = {
        location: {
            type: 'Point',
            coordinates: [latitude, longitude]
        }
    }

    Commerce
        .create({ owner: _id, title, description, imageUrl, category, address })
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

module.exports = router