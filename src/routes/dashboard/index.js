const MainDashboardRouter = require("express").Router()

MainDashboardRouter.route("/")
    .get(require("./dashboard.view.js") )
    .post(require("../post/create.js"))

module.exports = MainDashboardRouter