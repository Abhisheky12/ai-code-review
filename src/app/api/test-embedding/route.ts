

// import { GoogleGenAI } from "@google/genai";
// import { NextResponse } from "next/server";

// const genAI = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
// });

// export async function GET() {
//   try {
//     const response =
//       await genAI.models.embedContent({
//         model: "gemini-embedding-001",
//         contents: "Hello World",
//         config: {
//           outputDimensionality: 768,
//         },
//       });

//     const embedding =
//       response.embeddings?.[0]?.values ?? [];

//     return NextResponse.json({
//       success: true,
//       dimension: embedding.length,
//       sample: embedding.slice(0, 5),
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         error:
//           error instanceof Error
//             ? error.message
//             : String(error),
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


import { generateText } from "ai";
import { createGroq } from "@ai-sdk/groq";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET() {
  const { text } = await generateText({
    model: groq(
      "llama-3.3-70b-versatile"
    ),
    prompt: "Say hello in one sentence",
  });

  console.log(text);

  return Response.json({
    success: true,
    text,
  });
}