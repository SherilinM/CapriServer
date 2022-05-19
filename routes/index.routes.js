const router = require("express").Router();

router.use("/auth", require('./auth.routes'))


const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const commerceRoutes = require("./commerce.routes");
router.use("/commerce", commerceRoutes)

const commentRoutes = require("./comment.routes")
router.use("/comment", commentRoutes)

module.exports = router;
