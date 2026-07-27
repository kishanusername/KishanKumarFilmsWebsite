import "dotenv/config";
import cors from "cors";
import express from "express";
import { mkdir } from "node:fs/promises";
import path from "node:path"; 
import { fileURLToPath } from "node:url";

import enquiryRouter from "./routes/enquiry.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5000);

await mkdir(path.join(__dirname, "data"), { recursive: true });
await mkdir(path.join(__dirname, "uploads"), { recursive: true });

const app = express();
app.disable("x-powered-by");
app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(",") || true }));
app.use(express.json({ limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/enquiry", enquiryRouter);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(error.status || 500).json({
    message: error.message || "An unexpected server error occurred.",
  });
});

app.listen(port, () => {
  console.log(`Enquiry API running at http://localhost:${port}`);
});
