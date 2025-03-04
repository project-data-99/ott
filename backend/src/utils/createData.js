import UserRole from "../models/user-role.model.js";

export const createDefaultRoles = async () => {
  const roles = await UserRole.find();
  if (roles.length === 0) {
    await UserRole.insertMany([{ name: "admin" }, { name: "user" }]);
    console.log("✅ Default roles added: admin, user");
  }
};
