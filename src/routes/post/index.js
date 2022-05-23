MainPostRouter = require('express').Router()

MainPostRouter.route("/create")
    .post(require("./create"))

module.exports = MainPostRouter