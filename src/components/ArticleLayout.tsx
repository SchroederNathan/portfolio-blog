'use client'

import { useRouter } from 'next/navigation'
import { useContext } from 'react'

import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { ViewTracker } from '@/components/ViewTracker'
import { formatDate } from '@/lib/formatDate'
import { Article } from '@prisma/client'
import { Prose } from './Prose'
;``
function ArrowLeftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ViewIcon = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  )
}

export function ArticleLayout({
  article,
  children,
}: {
  article: Article
  children: React.ReactNode
}) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  // Convert date string to Date object if it's not already
  const dateValue =
    typeof article.date === 'string'
      ? article.date
      : article.date instanceof Date
        ? article.date.toISOString()
        : String(article.date) // Convert to string explicitly

  return (
    <Container className="mt-16 lg:mt-32">
      <ViewTracker articleId={article.id} />
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
                {article.title}
              </h1>

              <div className="order-first flex w-full flex-row items-center justify-between">
                <time
                  dateTime={dateValue}
                  className="flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(dateValue)}</span>
                </time>
                <div className="flex flex-row items-center gap-1">
                  <p className="text-zinc-400 dark:text-zinc-500">
                    {article.viewCount}
                  </p>
                  <ViewIcon className="size-5 text-zinc-400 dark:text-zinc-500" />
                </div>
              </div>
            </header>

            <Prose className="mt-8" data-mdx-content>
              {children}
            </Prose>
          </article>
        </div>
      </div>
      {/* <EditArticle article={article} /> */}
    </Container>
  )
}
