import mongoose from "mongoose";

const db = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`DB connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to DB: ${err.message}`);
    process.exit(1);
  }
};

export default db;
