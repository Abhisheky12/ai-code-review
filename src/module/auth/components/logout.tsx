"use client";

import React from "react";
import { signOut } from "@/lib/auth-client"; // Auth client signout tool
import { useRouter } from "next/navigation"; // Next.js navigation engine

// Type contract for safe data passing
interface LogoutProps {
  children: React.ReactNode; // Content inside component
  className?: string; // Optional custom styling injection
}

const Logout = ({ children, className }: LogoutProps) => {
  const router = useRouter(); // Core router instance initialization

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // Forward to login upon exit
        },
      },
    });
  };

  return (
    <span 
      className={className} // Dynamically apply layout parameters
      onClick={handleSignOut} // Trigger safe secure session clean-up
    >
      {children} 
    </span>
  );
};

export default Logout;