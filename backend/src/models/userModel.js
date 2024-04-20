import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // Full name
    name: {
      type: String,
      required: [true, "you need to provide a name"],
      min: 2,
      max: 70,
    },
    // username
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [3, "Your username must be at least 3 characters long!"],
      maxLength: [
        20,
        "Your username must can not more than 20 characters long!",
      ],
    },
    // email
    email: {
      type: String,
      required: [true, "Email is required"],
      min: [7, "Please enter at least 7 characters!"],
      max: [50, "Can not more than 50 characters"],
      unique: true,
    },
    // password
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters."],
      maxLength: 100,
    },
    // is admin?
    isAdmin: {
      type: Boolean,
      default: false,
    },
    // Profile picture - avatar
    profilePic: {
      type: String,
      default: "",
    },
    // cover: {
    // 	type: String,
    // 	trim: true,
    //   },

    // followers
    followers: {
      type: [String],
      default: [],
    },
    // following
    following: {
      type: [String],
      default: [],
    },
    // Phone number
    phone: {
      type: String,
      default: "",
    },
    // Address
    address: {
      type: String,
      default: "",
    },
    // birthDate: Date,
    // gender: String,

    // Bio
    bio: {
      type: String,
      default: "",
    },
    // is Frozen?
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
