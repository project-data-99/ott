import mongoose from "mongoose";

const UserRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: String,
      },
    ], // Example: ['manage_videos', 'delete_comments']
  },
  {
    timestamps: true,
  }
);

const UserRole = mongoose.model("UserRole", UserRoleSchema);

export default UserRole;
