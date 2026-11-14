import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            console.error("❌ MONGO_URI is not set in .env file");
            return;
        }

        // Only attach listeners once
        if (mongoose.connection.listenerCount('connected') === 0) {
            mongoose.connection.on('connected', () => console.log("✅ Database Connected"))
            mongoose.connection.on('disconnected', () => console.warn("⚠️  Database Disconnected"))
            mongoose.connection.on('error', (err) => {
                if (err.code === 'ERR_SSL_TLSV1_ALERT_INTERNAL_ERROR') return;
                console.error("⚠️  Mongoose error:", err.message);
            });
        }

        const options = {
            connectTimeoutMS: 30000,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 60000,
            heartbeatFrequencyMS: 10000,
            retryWrites: true,
            maxPoolSize: 10,
            family: 4,                       // Force IPv4 — avoids IPv6 TLS issues on Windows
            tls: true,
            tlsAllowInvalidCertificates: true,
        }

        await mongoose.connect(process.env.MONGO_URI, options)
    } catch (error) {
        console.error("⚠️  Database connection error:", error.message);
        console.log("Retrying connection in 5 seconds...");
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;

// Do not use '@' symbol in your database user's password else it will show an error.