import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Router } from "express";
import multer from "multer";
import { sendEnquiryEmail } from "../services/email.js";
import { sendWhatsAppOrderNotification } from "../services/whatsapp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDirectory = path.resolve(__dirname, "..");
const uploadDirectory = path.join(backendDirectory, "uploads");
const dataFile = path.join(backendDirectory, "data", "enquiries.json");
const maxFileSize = 10 * 1024 * 1024;

function createOrderId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const reference = randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
  return `KKF-${date}-${reference}`;
}

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (_request, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    callback(null, `${Date.now()}-${randomUUID()}${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: maxFileSize, files: 1 },
  fileFilter: (_request, file, callback) => {
    const allowedTypes = new Set([
      "image/jpeg", "image/png", "image/webp", "application/pdf",
      "video/mp4", "video/quicktime",
    ]);
    callback(null, allowedTypes.has(file.mimetype));
  },
});

const router = Router();

const asBoolean = (value) => value === true || value === "true";

function validate(body = {}) {
  const errors = {};
  if (!body.fullName?.trim()) errors.fullName = "Full name is required.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.email = "A valid email address is required.";
  }
  if (!body.whatsapp?.trim() || !/^[0-9+\-\s()]{7,15}$/.test(body.whatsapp)) {
    errors.whatsapp = "A valid WhatsApp number is required.";
  }
  if (!body.serviceRequired?.trim()) errors.serviceRequired = "Service required is mandatory.";
  if (!body.projectDescription?.trim()) errors.projectDescription = "Project description is required.";
  if (!asBoolean(body.consent)) errors.consent = "Consent is required.";
  return errors;
}

async function readEnquiries() {
  try {
    return JSON.parse(await readFile(dataFile, "utf8"));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

router.post("/", upload.single("attachment"), async (request, response, next) => {
  try {
    const errors = validate(request.body);
    if (Object.keys(errors).length) {
      return response.status(400).json({ message: "Please correct the form fields.", errors });
    }

    const enquiries = await readEnquiries();
    const enquiry = {
      id: randomUUID(),
      orderId: createOrderId(),
      receivedAt: new Date().toISOString(),
      ...request.body,
      photography: asBoolean(request.body.photography),
      drone: asBoolean(request.body.drone),
      multipleLocations: asBoolean(request.body.multipleLocations),
      consent: true,
      attachment: request.file
        ? { originalName: request.file.originalname, path: `/uploads/${request.file.filename}`, mimeType: request.file.mimetype, size: request.file.size }
        : null,
    };

    await sendEnquiryEmail(enquiry, request.file);
    enquiries.push(enquiry);
    await writeFile(dataFile, JSON.stringify(enquiries, null, 2), "utf8");

    // WhatsApp delivery is optional: a notification failure must not lose a valid enquiry.
    sendWhatsAppOrderNotification(enquiry).catch((error) => {
      console.error(`WhatsApp notification failed for ${enquiry.orderId}:`, error.message);
    });

    response.status(201).json({ message: "Enquiry received.", enquiryId: enquiry.id, orderId: enquiry.orderId });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (_request, response, next) => {
  try {
    response.json(await readEnquiries());
  } catch (error) {
    next(error);
  }
});

export default router;
