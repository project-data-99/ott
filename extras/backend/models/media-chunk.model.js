import mongoose from "mongoose";

const MediaChunkSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    chunkIndex: {
      type: Number,
      required: true,
    },
    filePath: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const MediaChunk = mongoose.model("MediaChunk", MediaChunkSchema);

export default MediaChunk;
