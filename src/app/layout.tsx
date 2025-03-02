import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import '@/styles/tailwind.css'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    template: '%s - Nathan Schroeder',
    default: 'Nathan Schroeder - Software developer',
  },
  description:
    "I'm Nathan, a software developer based in Windsor, Ontario. I create intuitive and efficient software solutions.",
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    images: [
      {
        url: '/images/metadata-preview.jpg',
        width: 1200,
        height: 630,
        alt: 'Nathan Schroeder',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-zinc-950">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />

      </body>
    </html>
  )
}
