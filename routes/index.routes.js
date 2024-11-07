const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const usersRoutes = require("../routes/reference.routes");
router.use("/references", usersRoutes);

module.exports = router;
