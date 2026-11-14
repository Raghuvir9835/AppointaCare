import express from "express"
import { exec } from 'child_process'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import './models/doctorModel.js'
import './models/userModel.js'
import './models/aiDoctorModel.js'
import './models/aiChatModel.js'
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import healthTrackerRouter from "./routes/healthTrackerRoutes.js"
import aiDoctorRouter from "./routes/aiDoctorRoute.js"
import errorHandler from "./middleware/error.js"
import "./initAIDoctor.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors());


// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api/health-tracker", healthTrackerRouter)
app.use("/api/ai-doctor", aiDoctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

// Error handler middleware
app.use(errorHandler);

function startServer() {
  const server = app.listen(port, () => console.log(`Server started on PORT:${port}`));

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && process.platform === 'win32') {
      console.warn(`⚠️  Port ${port} is already in use. Attempting to free it...`);
      // Kill the process holding the port (Windows PowerShell)
      exec(
        `powershell -Command "Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess | Sort-Object -Unique | ForEach-Object { Stop-Process -Id $_ -Force -ErrorAction SilentlyContinue }"`,
        (killErr) => {
          if (killErr) {
            console.error(`❌ Could not free port ${port}. Please close the process manually and restart.`);
            process.exit(1);
          } else {
            console.log(`✅ Port ${port} freed. Restarting server in 1 second...`);
            setTimeout(startServer, 1000);
          }
        }
      );
    } else {
      console.error(err);
      process.exit(1);
    }
  });
}

startServer();
