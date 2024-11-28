import crypto from "crypto";

/**
 * Verifies the validity of a signature
 * X-Signature = ToBase64String(Sha256(RequestBody + Secret))
 * @param payload The message body to validate
 * @param signature The signature to verify
 * @param secret The key used to generate the signature
 * @returns Whether the signature is valid
 */
export function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  if (!secret) {
    throw new Error("Secret key is required for signature verification.");
  }

  // Create the hash using SHA256
  const hash = crypto.createHash("sha256");
  hash.update(payload + secret);

  // Compute the Base64-encoded signature
  const computedSignature = hash.digest("base64");

  // Convert signatures to buffers for comparison
  const computedSignatureBuffer = Uint8Array.from(
    Buffer.from(computedSignature, "utf-8")
  );
  const providedSignatureBuffer = Uint8Array.from(
    Buffer.from(signature, "utf-8")
  );

  // Return false if lengths do not match
  if (computedSignatureBuffer.length !== providedSignatureBuffer.length) {
    return false;
  }

  // Perform timing-safe comparison of signatures
  return crypto.timingSafeEqual(
    computedSignatureBuffer,
    providedSignatureBuffer
  );
}

/**
 * Extracts the signature from headers and validates it.
 * @param headers The request headers object
 * @param payload The request body (stringified JSON)
 * @param secret The secret key for verification
 * @returns Whether the signature is valid
 */
export function validateRequest(
  headers: Record<string, string | string[] | undefined>,
  payload: string,
  secret: string
): boolean {
  const signature = headers["x-signature"];

  if (!signature || typeof signature !== "string") {
    throw new Error("X-Signature header is missing or invalid.");
  }

  return verifySignature(payload, signature, secret);
}
