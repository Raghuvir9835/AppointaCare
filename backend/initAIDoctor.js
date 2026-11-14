import 'dotenv/config'
import mongoose from 'mongoose';
import aiDoctorModel from "./models/aiDoctorModel.js";

// Wait for mongoose to be in a connected state with retries
const waitForConnection = (maxWaitMs = 30000) => {
    return new Promise((resolve, reject) => {
        // Already connected
        if (mongoose.connection.readyState === 1) {
            return resolve();
        }

        const started = Date.now();

        const check = () => {
            if (mongoose.connection.readyState === 1) {
                return resolve();
            }
            if (Date.now() - started > maxWaitMs) {
                return reject(new Error('Timed out waiting for DB connection'));
            }
            setTimeout(check, 1000);
        };

        // Start polling
        setTimeout(check, 1000);
    });
};

const initializeAIDoctor = async () => {
    try {
        // Wait for the existing connection (set up in server.js) — do NOT call connectDB() again
        await waitForConnection(60000); // wait up to 60 seconds

        // Check if AI doctor already exists
        const existingAIDoctor = await aiDoctorModel.findOne({ isAIDoctor: true });

        if (existingAIDoctor) {
            console.log('✅ AI Doctor already exists in database');
            return;
        }

        // Create new AI doctor
        const aiDoctor = new aiDoctorModel({
            name: "Dr. AI Assistant",
            email: "ai.doctor@appointacare.com",
            password: "ai_doctor_secure_password",
            image: "https://res.cloudinary.com/demo/image/upload/v1/samples/ai-doctor-avatar.jpg",
            speciality: "AI Medical Assistant",
            degree: "AI-Powered Medical AI",
            experience: "Advanced AI",
            about: "I am an AI-powered medical assistant designed to provide preliminary health assessments, answer medical questions, and offer general health guidance.",
            available: true,
            fees: 0,
            address: { line1: "Virtual Consultation", line2: "Available 24/7" },
            date: Date.now(),
            isAIDoctor: true,
            aiCapabilities: {
                symptomAnalysis: true,
                medicationInfo: true,
                healthGuidance: true,
                emergencyAlerts: true
            },
            medicalKnowledge: {
                specialties: ["General Medicine", "Symptom Analysis", "Health Guidance"],
                certifications: ["AI Medical Assistant", "Health Information Provider"],
                languages: ["English"]
            }
        });

        await aiDoctor.save();
        console.log('✅ AI Doctor initialized successfully');

    } catch (error) {
        // Only warn — never crash the server over AI Doctor init
        console.warn('⚠️  AI Doctor init skipped:', error.message);
    }
};

// Run initialization only if MONGO_URI is available
if (process.env.MONGO_URI) {
    initializeAIDoctor();
} else {
    console.warn('MONGO_URI not set, skipping AI Doctor initialization');
}