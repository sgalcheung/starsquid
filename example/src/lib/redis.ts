import { createClient, type RedisClientType } from "redis";

const client: RedisClientType = createClient({
  url: import.meta.env.REDIS_URL,
});

client.on("error", (err) => console.error("Redis Client Error:", err));

async function connectRedis() {
  if (!client.isOpen) {
    try {
      await client.connect();
      console.log("Connected to Redis.");
    } catch (err) {
      console.error("Failed to connect to Redis:", err);
      // Optional: Retry logic or error handling here
    }
  }
}

// Ensure the client is connected before performing operations
async function ensureConnected() {
  if (!client.isOpen) {
    await connectRedis();
  }
}

export async function storeRedis(
  key: string,
  value: string,
  expiresInSeconds: number
): Promise<void> {
  await ensureConnected();
  try {
    await client.set(key, value, { EX: expiresInSeconds });
    console.log(
      `Key "${key}" stored in Redis with expiry of ${expiresInSeconds} seconds.`
    );
  } catch (error) {
    console.error(`Error storing key "${key}" in Redis:`, error);
  }
}

export async function getFromRedis(key: string): Promise<string | null> {
  await ensureConnected();
  try {
    const value = await client.get(key);
    console.log(
      value
        ? `Key "${key}" retrieved from Redis.`
        : `Key "${key}" not found or expired.`
    );
    return value;
  } catch (error) {
    console.error(`Error retrieving key "${key}" from Redis:`, error);
    return null;
  }
}
