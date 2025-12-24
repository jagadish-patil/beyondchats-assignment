import axios from "axios";

const LARAVEL_API_BASE = "http://127.0.0.1:8000/api";

/**
 * Fetch the latest article from Laravel API
 */
export async function fetchLatestArticle() {
  try {
    const response = await axios.get(`${LARAVEL_API_BASE}/articles`);

    if (!Array.isArray(response.data) || response.data.length === 0) {
      throw new Error("No articles found in API");
    }

    // Assuming latest article is the last one (based on creation order)
    const latestArticle = response.data[response.data.length - 1];

    return {
      id: latestArticle.id,
      title: latestArticle.title,
      url: latestArticle.url,
      content: latestArticle.content || "",
    };
  } catch (error) {
    console.error("Failed to fetch latest article:", error.message);
    throw error;
  }
}
