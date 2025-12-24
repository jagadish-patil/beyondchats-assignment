import { getJson } from "serpapi";

const EXCLUDED_DOMAINS = [
    "beyondchats.com",
    "amazon.",
    "flipkart.",
    "youtube.com",
    "youtu.be",
    "quora.com",
    "reddit.com",
    "facebook.com",
    "pdf",
    "pinterest.com",
    "linkedin.com"
];

function isValidArticle(result) {
    const link = result.link?.toLowerCase() || "";
    const title = result.title?.toLowerCase() || "";
  
    // Exclude unwanted domains
    if (EXCLUDED_DOMAINS.some(domain => link.includes(domain))) {
      return false;
    }
  
    // Heuristic: looks like an article
    const articleIndicators = [
      "/blog",
      "/article",
      "/guide",
      "/post",
      "/learn",
      "introduction",
      "what is",
      "guide",
      "beginner"
    ];
  
    return articleIndicators.some(indicator =>
      link.includes(indicator) || title.includes(indicator)
    );
}

/**
 * Search Google and return top 2 blog/article links
 */
export async function searchGoogleArticles(query) {
  return new Promise((resolve, reject) => {
    getJson(
      {
        q: query,
        engine: "google",
        num: 10,
        api_key: process.env.SERPAPI_KEY,
      },
      (json) => {
        if (!json.organic_results) {
          return reject(new Error("No organic results found"));
        }

        const filteredLinks = [];

        for (const result of json.organic_results) {

          // Filter out unwanted sources

        if (!isValidArticle(result)) continue;

          filteredLinks.push({
            title: result.title,
            link: result.link,
          });

          if (filteredLinks.length === 2) break;
        }

        resolve(filteredLinks);
      }
    );
  });
}
