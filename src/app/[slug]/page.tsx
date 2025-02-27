import { ArticleLayout } from '@/components/ArticleLayout'
import { prisma } from '@/lib/prisma'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  })

  if (!article) {
    return {}
  }

  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { images: true },
  })

  if (!article) {
    notFound()
  }

  // Serialize the MDX content
  const mdxSource = await serialize(article.content)

  // Create an article object that matches the expected format
  const articleData = {
    slug: article.slug,
    title: article.title,
    description: article.description,
    author: article.author,
    date: article.date.toISOString(),
  }

  return (
    <ArticleLayout article={articleData}>
      <MDXRemote {...mdxSource} />
    </ArticleLayout>
  )
}
