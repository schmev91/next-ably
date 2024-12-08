import { createHmac } from "crypto";

export function getAblyJWT() {
  const header = {
    typ: "JWT",
    alg: "HS256",
    kid: process.env.ABLY_KEY!,
  };

  const currentTime = Math.round(Date.now() / 1000);
  const claims = {
    iat: currentTime, // current time in seconds
    exp: currentTime + 3600, // time of expiration in seconds
    "x-ably-capability": '{"*":["*"]}',
  };

  const base64Header = btoa(JSON.stringify(header));
  const base64Claims = btoa(JSON.stringify(claims));

  // Combine the header and claims
  const data = `${base64Header}.${base64Claims}`;

  // Create a HMAC with the secret key
  const signature = createHmac("sha256", process.env.ABLY_KEY!)
    .update(data)
    .digest("base64");

  // Form the complete JWT
  const ablyJwt = `${base64Header}.${base64Claims}.${signature}`;

  return ablyJwt;
}
