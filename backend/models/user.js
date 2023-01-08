const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const enumValues = require("mongoose-enumvalues");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    phonenum: { type: String, required: true, unique: true },
    imgPath: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, default: "None" },
    category: { type: String, default: "None" },
    speciality: { type: String, default: "None" },
    location: { type: String, default: "None" },
    Paymentstatu: { type: String, default: "Not-Payed" },

    roles: {
      type: [
        {
          type: String,
          enum: ["student", "teacher", "admin"],
        },
      ],
      default: "student",
    },
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

const enumOptions = {};

userSchema.plugin(enumValues, enumOptions);

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
