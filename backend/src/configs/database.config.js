import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbUrl = process.env.MONGO_URL;
    const dbName = "ott";
    const connectionUrl = `${dbUrl}/${dbName}`;

    const instance = await mongoose.connect(connectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`😊 Database connected on HOST :: ${instance.connection.host}`);
    return instance;
  } catch (error) {
    console.error(`😒 Error connecting Database :: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
