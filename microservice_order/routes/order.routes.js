
const order = require("../controllers/order")

module.exports = app => {

    const router = require("express").Router()

    router.get("/", [], order.getAllOrders)

    router.get("/:id", [], order.getOrderById)

    router.post("/create", [],order.addOrder)

    router.put("/:id/status", [], order.updateOrderStatus)

    app.use('/order', router)
}
