const router = require("express").Router();
const Project = require("../models/Project.model.js")

// POST "/api/projects/home"
router.post("/home", async (req, res, next)=>{

  const {technologies} = req.body;
  // console.log(technologies)
  const filter = technologies.length
    ? {
        tecnologias: {
          $elemMatch: {
            $or: technologies.map((tech) => ({ [tech]: { $exists: true } })),
          },
        },
      }
    : {};

  try {
    const response = await Project.find(filter,
      "nombre imagePortada subtitulo github deploy tecnologias"
    )
    .limit(6)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

// GET "/api/projects/categories/unique"
router.get("/categories/unique", async (req, res, next)=>{
  const uniqueCat = new Set();
  try {
    const response = await Project.distinct("tecnologias")
    response.forEach(tech=>{
      const tecnologia = Object.keys(tech)[0]
      uniqueCat.add(tecnologia)
    })
    res.status(200).json(Array.from(uniqueCat))
  } catch (error) {
    next(error)
  }
})

// GET "/api/projects/detail/:projectId"
router.get("/detail/:projectId", async(req, res, next)=>{
  try {
    const {projectId} = req.params
    const response = await Project.findById(projectId)
    res.status(200).json(response)
  } catch (error) {
    next(error)
  }
})

module.exports = router