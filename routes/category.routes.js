const router = require("express").Router();
const Category = require('../models/Category.model')

router.get("/:category", (req, res) => {

    const { categoryId } = req.params

    Category
        .findById(categoryId)
        .then(response => res.json(response))
        .catch(err => res.status(500).json(err))

})




module.exports = router