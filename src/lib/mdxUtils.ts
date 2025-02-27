import fs from 'fs'
import path from 'path'

export function extractMdxContent(slug: string): {
  content: string
  metadata: {
    title: string
    description: string
    author: string
    date: string
  }
} {
  // Path to the MDX file
  const filePath = path.join(process.cwd(), 'src', 'app', slug, 'page.mdx')

  // Read the file content
  const fileContent = fs.readFileSync(filePath, 'utf8')

  // Extract the metadata section
  const metadataMatch = fileContent.match(/export const article = {([\s\S]*?)}/)
  const metadataString = metadataMatch ? metadataMatch[0] : ''

  // Extract the actual content (everything after the default export)
  const contentMatch = fileContent.match(
    /export default \(props\) => <ArticleLayout article={article} {...props} \/>([\s\S]*)/,
  )
  const content = contentMatch ? contentMatch[1].trim() : ''

  // Parse the metadata
  const titleMatch = metadataString.match(/title: ['"](.+?)['"]/)
  const descriptionMatch = metadataString.match(
    /description:\s*['"](.+?)['"](?:\s*,|\s*})/,
  )
  const authorMatch = metadataString.match(/author: ['"](.+?)['"]/)
  const dateMatch = metadataString.match(/date: ['"](.+?)['"]/)

  return {
    content,
    metadata: {
      title: titleMatch ? titleMatch[1] : '',
      description: descriptionMatch
        ? descriptionMatch[1].replace(/\n/g, ' ')
        : '',
      author: authorMatch ? authorMatch[1] : '',
      date: dateMatch ? dateMatch[1] : '',
    },
  }
}
