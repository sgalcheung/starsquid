import { createClient } from "redis";

const client = await createClient({
  url: import.meta.env.REDIS_URL,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export async function storeRedis(
  key: string,
  token: string,
  expiresInSeconds: number
) {
  try {
    await client.set(key, token, {
      EX: expiresInSeconds,
    });
    console.log("Stored successfully in Redis.");
  } catch (error) {
    console.error("Error storing in Redis:", error);
  }
}

export async function getFromRedis(key: string): Promise<string | null> {
  try {
    const token = await client.get(key);
    if (token) {
      console.log("Token retrieved successfully from Redis.");
      return token;
    } else {
      console.warn("Token not found in Redis or expired.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token from Redis:", error);
    return null;
  }
}
