import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {  streamText } from "ai";

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||Do you have any book recommendations?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await streamText({
      model: google("models/gemini-1.5-flash-latest"),
      prompt,
      maxTokens: 300,
    });
    return result.toDataStreamResponse();
  } catch (error) {
    console.log("Error sending message:", error);
  }
}
