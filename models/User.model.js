const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {

    firstName: {
      type: String,
      required: [true, 'Primer Nombre'],
      trim: true
    },

    lastName: {
      type: String,
      required: [true, 'Primer Apellido']
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    telephone: {
      stype: String
    },
    role: {
      type: String,
      enum: ['USER', 'COMMERCE'],
      default: 'USER'
    },
    profileImg: {
      type: String,
      default: 'https://okdiario.com/img/2022/04/10/fiesta-655x368.jpg'
    },
    favCommerce: [{
      type: Schema.Types.ObjectId,
      ref: 'Commerce'
    }]

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
