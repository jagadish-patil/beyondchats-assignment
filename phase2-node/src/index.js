import dotenv from "dotenv";
dotenv.config();

import { fetchLatestArticle } from "./fetchLatestArticle.js";
import { searchGoogleArticles } from "./googleSearch.js";
import { scrapeArticleContent } from "./scrapeArticle.js";
import { rewriteArticle } from "./llmRewrite.js";
import { publishArticle } from "./publishArticle.js";

async function run() {
  const article = await fetchLatestArticle();
  console.log("Original article:", article.title);

  const googleArticles = await searchGoogleArticles(article.title);

  // Take ONLY first 2 articles
  const ref1 = googleArticles[0];
  const ref2 = googleArticles[1];

  const content1 = await scrapeArticleContent(ref1.link);
  const content2 = await scrapeArticleContent(ref2.link);

  console.log("Calling LLM to rewrite article...");

  const rewrittenContent = await rewriteArticle(
    {
      title: article.title,
      content: article.content,
    },
    content1,
    content2,
    [ref1.link, ref2.link]
  );

  console.log("\n=== GENERATED ARTICLE ===\n");
  console.log(rewrittenContent);

  console.log("Publishing rewritten article to Laravel...");

    await publishArticle(
        article.id,
        article.title,
        rewrittenContent
    );

    console.log("✅ Article successfully updated in Laravel");

}

run();
