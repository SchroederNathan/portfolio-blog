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
    const { title, description, content, imageUrl } = req.body

    const article = await prisma.article.create({
      data: {
        title,
        description,
        author: 'Nathan Schroeder',
        date: new Date(),
        content,
        draft: true,
        images: imageUrl ? [imageUrl] : [],
        slug: title.toLowerCase().replace(/ /g, '-'),
      },
    })

    return res.status(201).json(article)
  } catch (error) {
    console.error('Error creating article:', error)
    return res.status(500).json({ error: 'Failed to create article' })
  }
}
