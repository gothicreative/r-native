import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("error to connect DB",error);
        process.exit(1);
    }
    
    }