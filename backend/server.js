const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

dotenv.config();

const isTestEnv = process.env.NODE_ENV === "test";

if (!isTestEnv) {
  const requiredEnv = ["MONGO_URI", "JWT_SECRET"];
  const missing = requiredEnv.filter((key) => !process.env[key]);
  if (missing.length) {
    console.error(`Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
  if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is not set — AI suggestion requests will fail until it is configured.");
  }
  connectDB();
}

const app = express();
app.set("trust proxy", 1);

app.use(helmet());
// app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", credentials: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://resume-builder-one-cyan-10.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));
app.use(express.json({ limit: "1mb" }));
app.use(mongoSanitize());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", globalLimiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many attempts. Try again later." },
});
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);

const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 30,
  message: { message: "AI suggestion limit reached for now. Try again later." },
});
app.use("/api/ai", aiLimiter);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resumes", require("./routes/resumeRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use((req, res) => res.status(404).json({ message: "Not found" }));

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    message: status === 500 ? "Something went wrong on our end." : err.message,
  });
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Resume Builder API running on port ${PORT}`));
}

module.exports = app;
