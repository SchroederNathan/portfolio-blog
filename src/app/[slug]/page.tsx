import { ArticleLayout } from '@/components/ArticleLayout'
import MDXContent from '@/components/MDXContent'
import { prisma } from '@/lib/prisma'
import rehypePrism from '@mapbox/rehype-prism'
import { serialize } from 'next-mdx-remote/serialize'
import { notFound } from 'next/navigation'
import remarkGfm from 'remark-gfm'

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

  try {
    // Serialize the MDX content with additional options
    const mdxSource = await serialize(article.content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypePrism, {}] as any],
        development: false,
      },
      // Don't try to parse frontmatter
      parseFrontmatter: false,
    })

    return (
      <ArticleLayout article={article}>
        <MDXContent source={mdxSource} />
      </ArticleLayout>
    )
  } catch (error) {
    console.error('Error serializing MDX:', error)

    // Fallback to rendering the content as plain text if MDX parsing fails
    return (
      <ArticleLayout article={article}>
        <div className="prose whitespace-pre-wrap dark:prose-invert">
          {article.content}
        </div>
      </ArticleLayout>
    )
  }
}
