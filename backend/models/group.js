const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require("mongoose-enumvalues");



const groupSchema = mongoose.Schema(
  {
    groupName: { type: String, required: true ,unique: true },
    groupCategory: { type: String, required: true},
    groupSpeciality: { type: String, required: true},
    groupTeacher: { type: String, required: true},
    groupLessonHours:{type :String,default:"1" },
    groupLessoncount:{type :String,default:"1" },
    groupLessondate:{type:String ,  required:true },
    groupUsers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        }
      ],

  },
  { timestamps: true }
);

const enumOptions = {};

groupSchema.plugin(enumValues, enumOptions);

groupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Group", groupSchema);
