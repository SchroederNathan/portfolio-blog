import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body

    const { title, description, author, date, content, slug } = body

    // Check if an article with this slug already exists
    const existingArticle = await prisma.article.findUnique({
      where: { slug },
    })

    if (existingArticle) {
      return res
        .status(409)
        .json({ error: 'An article with this slug already exists' })
    }

    // Create the new article
    const article = await prisma.article.create({
      data: {
        title,
        description,
        author,
        date: new Date(date),
        content,
        slug,
      },
    })

    return res.status(201).json(article)
  } catch (error) {
    console.error('Error creating article:', error)
    return res.status(500).json({ error: 'Failed to create article' })
  }
}
