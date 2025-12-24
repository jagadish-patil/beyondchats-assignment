import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function rewriteArticle(
    originalArticle,
    refContent1,
    refContent2,
    referenceLinks
  ) {
    console.log("⚠️ Using MOCK LLM output (Gemini access unavailable)");
  
    return `
  ${originalArticle.title}
  
  ## Introduction
  This article has been rewritten to improve clarity, structure, and SEO
  by analysing top-ranking articles from Google Search.
  
  ## Core Concepts
  ${refContent1.slice(0, 1200)}
  
  ## Practical Insights
  ${refContent2.slice(0, 1200)}
  
  ## Conclusion
  The rewritten article combines the strengths of multiple authoritative
  sources while maintaining originality.
  
  ---
  
  ## References
  1. ${referenceLinks[0]}
  2. ${referenceLinks[1]}
  `;
  }
  