

import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { indexRepo } from "@/inngest/functions";
import { generateReview } from "@/inngest/functions/review";

console.log("Inngest client:", inngest);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [indexRepo,generateReview],  
});