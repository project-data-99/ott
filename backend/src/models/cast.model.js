import mongoose from "mongoose";

const CastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cast_avatar: {
      type: String,
      default: "public/avatar/user-default.webp",
    },
  },
  { timestamps: true }
);

const Cast = mongoose.model("Cast", CastSchema);

export default Cast;
