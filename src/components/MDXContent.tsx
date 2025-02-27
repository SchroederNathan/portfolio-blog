// src/components/MDXContent.tsx
'use client'

import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

// Define components that can be used in MDX
const components = {
  Image,
  // Add any other components you want to use in your MDX here
}

export default function MDXContent({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />
}