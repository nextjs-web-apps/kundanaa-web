// lib/dbConnect.ts
import mongoose from "mongoose";

// Extending the global object to include mongoose for caching the connection
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

// Caching the connection on the global object
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connects to the MongoDB database using Mongoose.
 * This function is optimized for Next.js serverless functions by caching the connection.
 * @returns {Promise<mongoose.Connection>} The active Mongoose connection.
 */
export async function connectDB(): Promise<mongoose.Connection> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disabling command buffering
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    const mongooseInstance = await cached.promise;
    cached.conn = mongooseInstance.connection;
    console.log("MongoDB connected successfully.");
    return cached.conn;
  } catch (e) {
    cached.promise = null; // Reset promise if connection fails
    cached.conn = null;
    throw e;
  }
}
