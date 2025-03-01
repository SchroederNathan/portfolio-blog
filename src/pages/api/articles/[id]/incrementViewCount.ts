// pages/api/posts/[id]/incrementViewCount.js

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query

  if (req.method === 'POST') {
    try {
      const article = await prisma.article.update({
        where: { id: Number(id) },
        data: { viewCount: { increment: 1 } },
      })
      res.status(200).json(article)
    } catch (error) {
      res.status(500).json({ error: 'Failed to increment view count' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
