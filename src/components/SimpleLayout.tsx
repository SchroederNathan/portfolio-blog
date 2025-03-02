import Link from 'next/link'
import { Container } from './Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from './icons/SocialIcons'

export function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string
  intro: string
  children?: React.ReactNode
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <div className="mb-6 flex sm:mb-8">
          <a
            href="https://nathanschroeder.dev"
            className="text-sm/6 font-semibold text-teal-400"
          >
            View portfolio <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
          {title}
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {intro}
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://x.com/nater02"
            aria-label="Follow on X"
            icon={XIcon}
          />
          <SocialLink
            href="https://www.instagram.com/nathanschroederr/"
            aria-label="Follow on Instagram"
            icon={InstagramIcon}
          />
          <SocialLink
            href="https://github.com/SchroederNathan"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
          />
          <SocialLink
            href="https://www.linkedin.com/in/nathan-schroeder-a40aa2210/"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
          />
        </div>
      </header>
      {children && <div className="mt-16 sm:mt-20">{children}</div>}
    </Container>
  )
}
