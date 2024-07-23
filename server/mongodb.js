import mongoose from "mongoose";
const mongoURI =
  "mongodb://shanmukpavan7gollapalli:konect7124@ac-vsv2l36-shard-00-00.xo9l7kx.mongodb.net:27017,ac-vsv2l36-shard-00-01.xo9l7kx.mongodb.net:27017,ac-vsv2l36-shard-00-02.xo9l7kx.mongodb.net:27017/konnect?ssl=true&replicaSet=atlas-mb1133-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

const connectMongoDB = async (err) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    if (err) {
      console.log(err);
    } else {
      console.log("Mongo connected");
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default connectMongoDB;
