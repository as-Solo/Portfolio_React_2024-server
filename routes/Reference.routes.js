const router = require("express").Router();
const Reference = require("../models/Reference.model.js")


// GET "/api/references/home"
router.get("/home", async (req, res, next)=>{
    try {
        const response = await Reference.find()
        .limit(6)
        .sort({relevancia: 1})
        // console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

module.exports = router