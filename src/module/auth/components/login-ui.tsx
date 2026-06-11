"use client";

import React, { useState } from "react";
import { signIn } from "@/lib/auth-client"; // Core auth mechanism connection
import { Github, Loader2 } from "lucide-react"; // UI action state representations

export const LoginUI = () => {
  // State pipeline to isolate button triggers during verification wait times
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn.social({
        provider: "github",
        callbackURL: "/" // Target layout route context parameters
      });
    } catch (error) {
      console.error("Login authorization error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* Main viewport block mapping explicit layout parameters across viewports.
       Uses Tailwind v4 base color configurations instead of arbitrary hardcoded hex tokens. */
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-zinc-950 text-foreground font-sans antialiased select-none relative">
      
      {/* BACKGROUND GRAPHIC ORBS: Layered canvas glows serving as an aesthetic base across device dimensions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[10%] md:left-[20%] w-[250px] md:w-[450px] h-[250px] md:h-[450px] bg-indigo-600/10 blur-[80px] md:blur-[140px] rounded-full animate-pulse duration-4000" />
        <div className="absolute bottom-[20%] right-[10%] md:right-[20%] w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-emerald-500/5 blur-[70px] md:blur-[120px] rounded-full" />
      </div>

      {/* LEFT COLUMN: Editorial Presentation Platform Banner.
         Remains cleanly dropped out on mobile viewports via display configuration layer */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-gradient-to-br from-zinc-900/60 via-zinc-950/80 to-zinc-900/60 border-r border-border/40 relative z-10 backdrop-blur-xl">
        {/* Brand Namespace Block */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            CodeHorse.saas
          </span>
        </div>

        {/* Dynamic Display Typography Blocks */}
        <div className="space-y-6 my-auto max-w-lg">
          <h1 className="text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Cut Code Review <br />
            Time & Bugs in Half. <br />
            Instantly.
          </h1>
          <p className="text-muted-foreground text-base xl:text-lg leading-relaxed font-normal max-w-md">
            Supercharge your deployment cycles with autonomous contextual AI reviews driven by semantic engineering codebases intelligence.
          </p>
        </div>

        {/* Feature Matrix Footer Lineage */}
        <div className="grid grid-cols-2 gap-6 border-t border-border/30 pt-8 max-w-md">
          <div>
            <h4 className="text-sm font-semibold text-foreground">Semantic RAG</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Codebase environment map indexing.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Secure Processing</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Enterprise isolation compliance protocols.</p>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Fully Optimized Center Container for Core Access Operations.
         Guarantees beautiful spatial padding around card boundaries across all handheld layouts */}
      <div className="flex items-center justify-center p-4 sm:p-8 md:p-12 min-h-screen relative z-10">
        
        {/* Main Interface Action Card container with responsive padding controls */}
        <div className="w-full max-w-[440px] space-y-8 bg-zinc-900/40 border border-border p-6 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-zinc-800">
          
          {/* Header Typography Elements */}
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
              Welcome Back
            </h2>
            <p className="text-sm text-muted-foreground font-normal">
              Login using the following platform providers:
            </p>
          </div>

          {/* Interactive Core Trigger Box Area */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white disabled:opacity-75 disabled:cursor-not-allowed hover:bg-zinc-100 text-zinc-950 font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg shadow-black/10 group cursor-pointer text-sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-zinc-950" />
              ) : (
                <Github className="h-4 w-4 fill-current transition-transform duration-200 group-hover:scale-110" />
              )}
              <span>{isLoading ? "Connecting Identity..." : "Continue with GitHub"}</span>
            </button>
          </div>

          {/* Context Layout Switch Links */}
          <div className="text-center pt-2 space-y-4">
            <p className="text-xs text-muted-foreground">
              New to CodeHorse?&nbsp;&nbsp;
              <span className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline transition-all duration-200 cursor-pointer active:scale-95 inline-block">
                Sign Up
              </span>
            </p>
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-border/30"></div>
              <span className="flex-shrink mx-4 text-[10px] text-muted-foreground/40 uppercase tracking-widest font-bold">Or Alternate Options</span>
              <div className="flex-grow border-t border-border/30"></div>
            </div>
            <p className="text-xs text-zinc-400 hover:text-zinc-200 transition-all duration-200 cursor-pointer inline-block text-center w-full underline underline-offset-4 decoration-zinc-800 hover:decoration-zinc-600 active:scale-95">
              Self-Hosted Services
            </p>
          </div>

          {/* Footer Footprint Terms Compliance Row */}
          <div className="text-center border-t border-border/30 pt-6">
            <p className="text-[11px] text-muted-foreground/40 leading-relaxed max-w-xs mx-auto tracking-normal">
              By logging in, you agree to our <br />
              <span className="hover:text-zinc-300 underline cursor-pointer">Terms of Use</span> and <span className="hover:text-zinc-300 underline cursor-pointer">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUI;