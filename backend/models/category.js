const mongoose = require("mongoose");


const categorySchema = mongoose.Schema(
  {
    categName: { type: String, required: true ,unique: true },

  },
  { timestamps: true }
);



module.exports = mongoose.model("Categ", categorySchema);
