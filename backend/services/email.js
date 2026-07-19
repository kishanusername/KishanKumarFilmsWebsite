import nodemailer from "nodemailer";

const requiredSettings = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "ENQUIRY_RECIPIENT"];

function assertEmailConfigured() {
  const missing = requiredSettings.filter((setting) => !process.env[setting]);
  if (missing.length) {
    const error = new Error("Email notifications are not configured on the server.");
    error.status = 503;
    throw error;
  }
}

const formatValue = (value) => (value ? String(value) : "Not provided");

export async function sendEnquiryEmail(enquiry, attachment) {
  assertEmailConfigured();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const details = [
    ["Order ID", enquiry.orderId],
    ["Name", enquiry.fullName],
    ["Email", enquiry.email],
    ["WhatsApp", enquiry.whatsapp],
    ["Alternative contact", enquiry.altContact],
    ["Service", enquiry.serviceRequired],
    ["Project", enquiry.projectName],
    ["Description", enquiry.projectDescription],
    ["Event date", enquiry.eventDate],
    ["Location", enquiry.eventLocation],
    ["Duration", enquiry.eventDuration],
    ["Content type", enquiry.contentType],
    ["Purpose", enquiry.purpose],
    ["Creative vision", enquiry.visionDescription],
    ["Reference links", enquiry.referenceLinks],
    ["Photography required", enquiry.photography],
    ["Drone required", enquiry.drone],
    ["Multiple locations", enquiry.multipleLocations],
    ["Script availability", enquiry.scriptAvailability],
    ["Special instructions", enquiry.specialInstructions],
    ["Best time to contact", enquiry.bestTimeToContact],
    ["Preferred contact method", enquiry.preferredContactMethod],
  ];

  const attachments = attachment
    ? [{ filename: attachment.originalname, path: attachment.path, contentType: attachment.mimetype }]
    : [];

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.ENQUIRY_RECIPIENT,
    replyTo: enquiry.email,
    subject: `[${enquiry.orderId}] New portfolio enquiry: ${enquiry.fullName}`,
    text: details.map(([label, value]) => `${label}: ${formatValue(value)}`).join("\n"),
    attachments,
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: enquiry.email,
    replyTo: process.env.ENQUIRY_RECIPIENT,
    subject: `We received your enquiry — ${enquiry.orderId}`,
    text: [
      `Hi ${enquiry.fullName},`,
      "",
      "Thank you for contacting Kishan Kumar Films. Your project enquiry has been received.",
      `Your order ID is: ${enquiry.orderId}`,
      "",
      "Please keep this ID for future reference. We will review your brief and contact you within 1–2 business days.",
      "",
      "Kishan Kumar Films",
    ].join("\n"),
  });
}
