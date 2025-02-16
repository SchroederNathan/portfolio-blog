interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

async function importArticle(slug: string) {}

export async function getAllArticles() {}
