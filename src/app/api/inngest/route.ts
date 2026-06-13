

import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { processTask } from "@/inngest/functions";

console.log("Inngest client:", inngest);

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [processTask],
});