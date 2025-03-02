import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from './icons/SocialIcons'
import { SocialLink } from './SimpleLayout'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <div className="flex gap-6">
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
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Nathan Schroeder. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
