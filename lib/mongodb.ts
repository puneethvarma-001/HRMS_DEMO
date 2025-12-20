import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

// In dummy mode, MongoDB is not required
const isDummyMode = process.env.OAUTH2_DUMMY_MODE === 'true'

if (!MONGODB_URI && !isDummyMode) {
  throw new Error("Please define the MONGODB_URI environment variable (or set OAUTH2_DUMMY_MODE=true for demo mode)")
}

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  var _mongoose: MongooseCache
}

const cached: MongooseCache = global._mongoose || { conn: null, promise: null }

if (!global._mongoose) {
  global._mongoose = cached
}

export async function connectDB() {
  // In dummy mode, skip actual MongoDB connection
  if (isDummyMode) {
    return null
  }

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is required when not in dummy mode")
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
