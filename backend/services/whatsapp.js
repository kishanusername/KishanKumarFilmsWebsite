const requiredSettings = ["WHATSAPP_ACCESS_TOKEN", "WHATSAPP_PHONE_NUMBER_ID", "WHATSAPP_NOTIFY_TO"];

const formatWhatsAppNumber = (value) => String(value || "").replace(/\D/g, "");

export async function sendWhatsAppOrderNotification(enquiry) {
  const missing = requiredSettings.filter((setting) => !process.env[setting]);
  if (missing.length) {
    console.warn(`WhatsApp notification skipped; missing ${missing.join(", ")}.`);
    return { sent: false, reason: "not-configured" };
  }

  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v22.0";
  const recipient = formatWhatsAppNumber(process.env.WHATSAPP_NOTIFY_TO);
  const message = [
    "New Kishan Kumar Films enquiry",
    `Order ID: ${enquiry.orderId}`,
    `Name: ${enquiry.fullName}`,
    `Service: ${enquiry.serviceRequired}`,
    `WhatsApp: ${enquiry.whatsapp}`,
    `Project: ${enquiry.projectName || "Not provided"}`,
  ].join("\n");

  const response = await fetch(`https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipient,
      type: "text",
      text: { preview_url: false, body: message },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`WhatsApp notification failed: ${response.status} ${errorBody}`);
  }

  return { sent: true };
}
