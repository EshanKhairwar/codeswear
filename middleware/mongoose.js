import mongoose from "mongoose";

const connectDb = (handler) => async (req, res) => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return handler(req, res);
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return handler(req, res);
    } catch (error) {
        console.error("Error connecting to the database:", error);
        res.status(500).json({ error: "Database connection error" });
    }
};

export default connectDb;
