import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function test() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            tlsAllowInvalidCertificates: true
        });
        console.log("Connection successful with tlsAllowInvalidCertificates");
        process.exit(0);
    } catch (e) {
        console.error("Failed:", e.message);
        process.exit(1);
    }
}
test();
