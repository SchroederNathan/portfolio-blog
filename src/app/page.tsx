import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { Article } from '@prisma/client'

function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/${article.slug}`}>{article.title}</Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date.toISOString()}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date.toISOString())}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date.toISOString()}
        className="mt-1 max-md:hidden"
      >
        {formatDate(article.date.toISOString())}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata: Metadata = {
  title: "Nathan Schroeder's Blog",
  description:
    'Welcome to my blog where I share my thoughts, experiences, and insights about technology, life, and everything in between.',
}

export default async function ArticlesIndex() {
  const response = await getAllArticles()
  const articles = response.map((article) => ({
    ...article,
    slug: article.slug,
  }))

  return (
    <SimpleLayout
      title="Writing about my thoughts, experiences, and insights while building cool stuff ✍️"
      intro="Welcome to my blog where I share my thoughts, experiences, and insights about technology, life, and everything in between."
    >
      {/* <CreateMockData /> */}
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
