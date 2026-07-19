import dns from "node:dns";
import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  const dnsServers = process.env.DNS_SERVERS
    ?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (dnsServers?.length) {
    dns.setServers(dnsServers);
  }

  try {
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
