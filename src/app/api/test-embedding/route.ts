// import { embed } from "ai";
// import { google } from "@ai-sdk/google";
// import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const result = await embed({
//       model: google.textEmbeddingModel(
//         "gemini-embedding-004"
//       ),
//       value: "Hello World",
//     });

//     return NextResponse.json({
//       success: true,
//       length: result.embedding.length,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         error: String(error),
//       },
//       { status: 500 }
//     );
//   }
// }


import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function GET() {
  try {
    const response =
      await genAI.models.embedContent({
        model: "gemini-embedding-001",
        contents: "Hello World",
        config: {
          outputDimensionality: 768,
        },
      });

    const embedding =
      response.embeddings?.[0]?.values ?? [];

    return NextResponse.json({
      success: true,
      dimension: embedding.length,
      sample: embedding.slice(0, 5),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      }
    );
  }
}