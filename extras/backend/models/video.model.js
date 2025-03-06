import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    releaseDate: {
      type: Date,
    },
    duration: {
      type: Number,
    },
    thumbnail: {
      type: String,
    },
    contentRating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
    },
    mediaChunks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MediaChunk",
      },
    ],
    actors: [
      {
        type: String,
      },
    ],
    directors: [
      {
        type: String,
      },
    ],
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

export default Video;
