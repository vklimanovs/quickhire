// server/authRouter.ts
import express from "express";

const BACKEND_BASE = process.env.BACKEND_BASE_URL || "http://easysy:9000";

// Node 18+ has global fetch. If you’re on Node <18, install node-fetch and import it.

const router = express.Router();

/**
 * Small helper to forward the Google idToken to your backend.
 * Reused by both routes below so behavior stays consistent.
 */
async function forwardIdToken(idToken: string) {
  console.log("🔄 forwardIdToken called with idToken length:", idToken.length);
  console.log("🔄 Backend URL:", `${BACKEND_BASE}/auth/v1/google`);

  // Optional: timeout to avoid hanging connections
  const ac = new AbortController();
  const timeout = setTimeout(() => ac.abort(), 10_000);

  try {
    console.log("🔄 Making request to backend...");
    const res = await fetch(`${BACKEND_BASE}/auth/v1/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
      signal: ac.signal,
    });

    console.log("🔄 Backend response status:", res.status);
    console.log(
      "🔄 Backend response headers:",
      Object.fromEntries(res.headers.entries()),
    );

    const text = await res.text(); // read once
    console.log("🔄 Backend response text:", text);

    let json: any;
    try {
      json = text ? JSON.parse(text) : {};
      console.log("🔄 Parsed JSON response:", json);
    } catch {
      json = { error: text };
      console.log("🔄 Failed to parse JSON, using text as error:", text);
    }

    return { status: res.status, body: json };
  } catch (err: any) {
    console.error("❌ Error in forwardIdToken:", err);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Primary proxy endpoint
 * POST /auth/google
 * body: { idToken: string }
 */
router.post("/google", async (req, res) => {
  console.log("🔍 Google auth route hit - Request body:", req.body);
  console.log("🔍 Request headers:", req.headers);

  const { idToken } = req.body ?? {};
  if (!idToken || typeof idToken !== "string") {
    console.log("❌ No idToken or invalid idToken received");
    return res.status(400).json({ error: "ID token is required" });
  }

  console.log("✅ idToken received, length:", idToken.length);
  console.log("✅ idToken starts with:", idToken.substring(0, 50) + "...");

  try {
    console.log("🔄 Forwarding idToken to backend...");
    const result = await forwardIdToken(idToken);
    console.log("✅ Backend response received:", result);
    return res.status(result.status).json(result.body);
  } catch (err: any) {
    console.error("❌ Error forwarding Google ID token:", err);
    const msg = err?.name === "AbortError" ? "Upstream timeout" : "Proxy error";
    return res.status(502).json({ error: msg });
  }
});

/**
 * Legacy path kept for backward compatibility
 * POST /auth/google/idToken
 * body: { idToken: string }
 */
router.post("/google/idToken", async (req, res) => {
  console.log("🔍 Legacy Google auth route hit - Request body:", req.body);

  const { idToken } = req.body ?? {};
  if (!idToken || typeof idToken !== "string") {
    console.log("❌ No idToken or invalid idToken received in legacy route");
    return res.status(400).json({ error: "ID token is required" });
  }

  console.log("✅ idToken received in legacy route, length:", idToken.length);

  try {
    const result = await forwardIdToken(idToken);
    return res.status(result.status).json(result.body);
  } catch (err: any) {
    console.error("❌ Error forwarding Google ID token (legacy):", err);
    const msg = err?.name === "AbortError" ? "Upstream timeout" : "Proxy error";
    return res.status(502).json({ error: msg });
  }
});

export default router;
