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
	expiresInSeconds: number,
): Promise<void> {
	await ensureConnected();
	try {
		await client.set(key, value, { EX: expiresInSeconds });
		console.log(
			`Key "${key}" stored in Redis with expiry of ${expiresInSeconds} seconds.`,
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
				: `Key "${key}" not found or expired.`,
		);
		return value;
	} catch (error) {
		console.error(`Error retrieving key "${key}" from Redis:`, error);
		return null;
	}
}

/**
 * Logic-Layer Check
 * - Ease of Maintenance
 * - Decoupled Redis Logic
 * - Custom Business Logic
 * @param key to update value of the key
 * @param newValue to update value ot the content
 * @param expiresInSeconds optional, set the cache timeout
 */
export async function setIfChanged(
	key: string,
	newValue: string,
	expiresInSeconds?: number,
): Promise<boolean> {
	try {
		await ensureConnected();

		const currentValue = await client.get(key);

		if (currentValue !== newValue) {
			if (expiresInSeconds && expiresInSeconds > 0) {
				// Use the options object for TTL
				await client.set(key, newValue, { EX: expiresInSeconds });
			} else {
				await client.set(key, newValue);
			}

			console.log(
				`"${key}" updated in Redis with TTL: ${expiresInSeconds ?? "none"}`,
			);
			return true; // Indicate the key was updated
		}

		console.log(`"${key}" is already up-to-date, no update needed`);
		return false; // Indicate no update was made
	} catch (error) {
		console.error(`Error updating "${key}" in Redis:`, error);
		throw error; // Re-throw the error for upstream handling
	}
}

/**
 * Handling the Check in Redis
 * - Need for Atomicity
 * - High Write Frequency
 * - Distributed Applications
 * @param key to update value of the key
 * @param newValue to update value ot the content
 */
export async function AtomicUpdate(key: string, newValue: string) {
	await ensureConnected();
	const script = `
    local current = redis.call("GET", KEYS[1])
    if current ~= ARGV[1] then
        redis.call("SET", KEYS[1], ARGV[1])
        return 1
    else
        return 0
    end
`;

	const result = await client.eval(script, {
		keys: [key],
		arguments: [newValue],
	});
	if (result === 1) {
		console.log(`"${key}" updated in Redis`);
	} else {
		console.log(`"${key}" no update needed`);
	}
}
