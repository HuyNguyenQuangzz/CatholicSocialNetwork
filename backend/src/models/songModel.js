import mongoose from "mongoose";

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // This will trim any leading or trailing whitespace characters from the title
      // example: " My heart will go on " ==> "My heart will go on"
      maxlength: 100,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    album: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    duration: {  // time of song
      type: Number,
      required: true,
      min: 0,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    audioUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
