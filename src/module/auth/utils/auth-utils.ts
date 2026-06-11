import { redirect } from "next/navigation"; // Server redirect tool
import { headers } from "next/headers"; // Header reader utility
import { auth } from "@/lib/auth"; // Main auth module instance

/**
 * Route Guard: Protects private routes.
 */
export const requireAuth = async () => {
  // Check active session cookies
  const session = await auth.api.getSession({
    headers: await headers(), // Async headers read
  });

  // Kick out if unauthenticated
  if (!session) {
    redirect("/login");
  }

  // Return active session data
  return session;
};

/**
 * Route Guard: Protects public auth views.
 */
export const requireUnAuth = async () => {
  // Read request auth cookies
  const session = await auth.api.getSession({
    headers: await headers(), // Server request parameters
  });

  // Redirect if already logged in
  if (session) {
    redirect("/");
  }

  // Allow access if guest
  return session;
};