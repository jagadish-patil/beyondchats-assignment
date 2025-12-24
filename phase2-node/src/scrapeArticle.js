import axios from "axios";
import * as cheerio from "cheerio";
import https from "https";

/**
 * Scrape main readable article content from a URL
 */
export async function scrapeArticleContent(url) {
  try {

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    const response = await axios.get(url, {
        httpsAgent: agent,
        headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Phase2Bot/1.0; +https://example.com/bot)"
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);

    // Remove noise
    $("script, style, nav, footer, header, aside, iframe").remove();

    let content = "";

    // 1️⃣ Prefer <article> tag
    if ($("article").length) {
      $("article p").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 50) content += text + "\n\n";
      });
    }

    // 2️⃣ Fallback: <main>
    if (content.length < 200 && $("main").length) {
      $("main p").each((_, el) => {
        const text = $(el).text().trim();
        if (text.length > 50) content += text + "\n\n";
      });
    }

    // 3️⃣ Fallback: div with most paragraphs
    if (content.length < 200) {
      let bestDiv = null;
      let maxParagraphs = 0;

      $("div").each((_, el) => {
        const pCount = $(el).find("p").length;
        if (pCount > maxParagraphs) {
          maxParagraphs = pCount;
          bestDiv = el;
        }
      });

      if (bestDiv) {
        $(bestDiv)
          .find("p")
          .each((_, el) => {
            const text = $(el).text().trim();
            if (text.length > 50) content += text + "\n\n";
          });
      }
    }

    return content.trim();
  } catch (error) {
    console.error(`Failed to scrape article: ${url}`);
    throw error;
  }
}
