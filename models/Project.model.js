const {model, Schema} = require("mongoose");


const funcionalidadSchema = new Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  descripcion: { type: String, required: true }
});

const skillSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true }
});

const colaboradorSchema = new Schema({
  nombre: {type: String, require: true},
  image: {type: String, require: true, unique: true},
  linkedin: {type: String, unique: true},
  github: {type: String, unique: true},
  comentario: {type: String, require: true}
})

skillSchema.index(
  { github: 1 },
  { unique: true, partialFilterExpression: { github: { $exists: true, $ne: null } } }
);
skillSchema.index(
  { linkedin: 1 },
  { unique: true, partialFilterExpression: { linkedin: { $exists: true, $ne: null } } }
);


const agradecimientoSchema = new Schema({
  titulo: {type: String, required: true},
  nombre: {type: String, require: true},
  image: {type: String, require: true, unique: true},
  linkedin: {type: String, unique: true},
  github: {type: String, unique: true},
  comentario: {type: String, require: true}
})

agradecimientoSchema.index(
  { github: 1 },
  { unique: true, partialFilterExpression: { github: { $exists: true, $ne: null } } }
);
agradecimientoSchema.index(
  { linkedin: 1 },
  { unique: true, partialFilterExpression: { linkedin: { $exists: true, $ne: null } } }
);


const projectSchema = new Schema(
  {
    relevancia: {type: Number, require: true, default: 100},
    imagePortada: {type: String, required: true, unique: true},
    nombre: {type: String, required: true, unique: true},
    subtitulo: {type: String, required: true},
    github: {type: String, unique: true},
    deploy: {type: String, unique: true},
    description: {type: String},
    aclaracion: {type: String},
    tecnologias: {type: [Object]},
    funcionalidades: [funcionalidadSchema],
    skills: [skillSchema],
    colaboradores: [colaboradorSchema],
    agradecimientos: [agradecimientoSchema]
  }
)

projectSchema.index(
  { github: 1 },
  { unique: true, partialFilterExpression: { github: { $exists: true, $ne: null } } }
);
projectSchema.index(
  { deploy: 1 },
  { unique: true, partialFilterExpression: { deploy: { $exists: true, $ne: null } } }
);