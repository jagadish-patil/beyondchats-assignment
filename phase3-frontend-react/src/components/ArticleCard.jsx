export default function ArticleCard({ article }) {
    return (
      <div className="card">
        <h2>{article.title}</h2>
  
        {article.excerpt && (
          <>
            <h4>Original Excerpt</h4>
            <p>{article.excerpt}</p>
          </>
        )}
  
        {article.content && (
          <>
            <h4>Updated Article</h4>
            <div className="content">
              {article.content.substring(0, 400)}...
            </div>
          </>
        )}
      </div>
    );
  }
  