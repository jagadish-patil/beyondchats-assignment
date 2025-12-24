import axios from "axios";

export async function publishArticle(articleId, title, content) {
  const url = `http://127.0.0.1:8000/api/articles/${articleId}`;

  const response = await axios.put(url, {
    title,
    content,
  });

  return response.data;
}
