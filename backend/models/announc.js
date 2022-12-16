const mongoose = require("mongoose");
const User = require("./user");


const anounc = mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: User },  
  userRole: { type: String  , required: true},
  content: { type: String  , required: true},
  
}
,{ timestamps: true }
);



module.exports = mongoose.model("Anounc", anounc);
