import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      index: { unique: true },
      required: true,
    },
    email: {
      type: String,
      trim: true,
      index: { unique: true },
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Salt password if password change detected
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Mongoose schema methods to use in controller
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.statics.findUserByEmail = async function (email) {
  return this.findOne({ email });
};

userSchema.statics.findUserByUsername = async function (username) {
  return this.findOne({ username });
};

const User = mongoose.model("User", userSchema);

export default User;
