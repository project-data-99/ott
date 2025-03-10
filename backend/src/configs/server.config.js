import app from "./app.config.js";
// import { createDefaultRoles } from "../utils/createData.js";

const connectServer = () => {
  const PORT = process.env.PORT || 8000;

  try {
    const appUrl = `http://localhost:${PORT}`;
    const connection = app.listen(PORT, () => {
      console.log(`😊 Server connected on ${appUrl}`);
    });

    // Create Dummy Data
    // createDefaultRoles();
    return connection;
  } catch (error) {
    console.log(`😒 Error connecting server :: ${error}`);
  }
};

export default connectServer;
