const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const referencesRoutes = require("../routes/Reference.routes");
router.use("/references", referencesRoutes);

const projectsRoutes = require("../routes/Project.routes");
router.use("/projects", projectsRoutes);

module.exports = router;
