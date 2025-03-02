import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { id } = req.query
    const { title, description, content, imageUrl } = req.body

    const article = await prisma.article.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        description,
        content,
        images: imageUrl ? [imageUrl] : undefined,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      },
    })

    return res.status(200).json(article)
  } catch (error) {
    console.error('Error updating article:', error)
    return res.status(500).json({ error: 'Failed to update article' })
  }
} 