import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connect Successfuly");
    }
    catch (error) {
        console.log("Error conncetion To Connect Database", error);
        process.exit(1);
    }
}

export default connectDB;