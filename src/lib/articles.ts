import { Article } from '@prisma/client'
import { prisma } from './prisma'

export interface ArticleWithSlug extends Article {
  slug: string
}

export async function getAllArticles(): Promise<ArticleWithSlug[]> {
  const articles = await prisma.article.findMany({
    orderBy: {
      date: 'desc',
    },
    cacheStrategy: { ttl: 60 },
  })

  // Transform the articles to ensure they match the ArticleWithSlug interface
  return articles.map((article) => ({
    ...article,
    // Ensure slug is included (it already is in your schema, but this makes TypeScript happy)
    slug: article.slug,
  }))
}

export async function getArticleBySlug(
  slug: string,
): Promise<ArticleWithSlug | null> {
  const article = await prisma.article.findUnique({
    where: {
      slug,
    },
    cacheStrategy: { ttl: 60 },
  })

  if (!article) {
    return null
  }

  return {
    ...article,
    slug: article.slug,
  }
}
