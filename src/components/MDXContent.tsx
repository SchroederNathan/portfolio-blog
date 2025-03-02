// src/components/MDXContent.tsx
'use client'

import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'

// Define components that can be used in MDX
const components = {
  Image: (props: any) => (
    <Image
      {...props}
      width={1000} // Full width
      height={1000} // Maintain aspect ratio
      className="w-full" // Make image fill container width
      alt={props.alt || ''} // Ensure alt text is provided
    />
  ),
  // Add any other components you want to use in your MDX here
}

export default function MDXContent({ source }: { source: any }) {
  return <MDXRemote {...source} components={components} />
}