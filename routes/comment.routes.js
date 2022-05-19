const router = require("express").Router()
const Comment = require('../models/Comment.model')
const { isAuthenticated } = require("../middlewares/jwt.middleware")



//CREATE COMMENTS
router.post("/:commerceId/create", isAuthenticated, (req, res) => {

    const { comment } = req.body
    const { commerceId: commerce } = req.params
    const { _id } = req.payload

    Comment
        .create({ owner: _id, commerce, comment })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//EDIT COMMENT
router.put("/:commentId/edit", (req, res) => {
    const { commentId } = req.params
    const { comment } = req.body


    Comment
        .findByIdAndUpdate(commentId, { comment }, { new: true })
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})

//DELETE COMMENT
router.delete("/:commentId/delete", (req, res) => {
    const { commentId } = req.params

    Comment
        .findByIdAndDelete(commentId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})


// GET ONE COMMERCE COMMENTS

router.get('/comments/:commerceId', (req, res) => {
    const { commerceId } = req.params

    Comment
        .find({ commerce: commerceId })
        .populate('owner')
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))
})






module.exports = router

