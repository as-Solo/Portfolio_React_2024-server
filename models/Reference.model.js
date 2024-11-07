const {model, Schema} = require("mongoose");

const referenceSchema = new Schema(
    {
      relevancia: {type: Number, required: true, default: 100},
      image:{type:String, required: true},
      nombre: {type: String, required: true, unique: true},
      cargo: {type: String, required: true},
      empresa: {type: String, required: true},
      linkPropio : {type: String, unique: true},
      linkedin : {type: String, unique: true},
      github : {type: String, unique: true},
      email: {type: String, unique: true},
      recomendacion: String,
    },
    {
      timestamps: true
    }
);

referenceSchema.index(
  { linkPropio: 1 },
  { unique: true, partialFilterExpression: { linkPropio: { $exists: true, $ne: null } } }
);
referenceSchema.index(
  { linkedin: 1 },
  { unique: true, partialFilterExpression: { linkedin: { $exists: true, $ne: null } } }
);
referenceSchema.index(
  { github: 1 },
  { unique: true, partialFilterExpression: { github: { $exists: true, $ne: null } } }
);
referenceSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { email: { $exists: true, $ne: null } } }
);

const Reference = model("Reference", referenceSchema);

module.exports = Reference;