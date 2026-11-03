import mongoose from "mongoose";


export const connectDB = async (): Promise<void> => {
    try {
        mongoose.connect(process.env.MONGO_URI as string)
        console.log("DataBase connected successfully!");
    } catch (err) {
        console.log("Error connecting to the database", err);
        process.exit(1);
    }
}