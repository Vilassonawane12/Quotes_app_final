const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose,{
  usernameField: 'email', // use email as the username field
});

module.exports = mongoose.model("User", userSchema);
