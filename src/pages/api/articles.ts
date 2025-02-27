// import { prisma } from '@/lib/prisma'
// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Handle GET request to fetch all articles
//   if (req.method === 'GET') {
//     try {
//       // Get query parameters for pagination and sorting
//       const { page = '1', limit = '10', sortBy = 'date', order = 'desc' } = req.query
      
//       // Convert to numbers
//       const pageNum = parseInt(page as string, 10)
//       const limitNum = parseInt(limit as string, 10)
//       const skip = (pageNum - 1) * limitNum
      
//       // Fetch articles with pagination and sorting
//       const articles = await prisma.article.findMany({
//         skip,
//         take: limitNum,
//         orderBy: {
//           [sortBy as string]: order === 'desc' ? 'desc' : 'asc',
//         },
//         include: {
//           images: true, // Include related images
//         },
//       })
      
//       // Get total count for pagination
//       const totalArticles = await prisma.article.count()
      
//       // Return articles with pagination metadata
//       return res.status(200).json({
//         articles,
//         pagination: {
//           total: totalArticles,
//           page: pageNum,
//           limit: limitNum,
//           totalPages: Math.ceil(totalArticles / limitNum),
//         },
//       })
//     } catch (error) {
//       console.error('Error fetching articles:', error)
//       return res.status(500).json({ error: 'Failed to fetch articles' })
//     }
//   } 
//   // Handle POST request to create a new article (reusing your existing code)
//   else if (req.method === 'POST') {
//     try {
//       const body = req.body
      
//       const { title, description, author, date, content, slug } = body
      
//       // Check if an article with this slug already exists
//       const existingArticle = await prisma.article.findUnique({
//         where: { slug }
//       })
      
//       if (existingArticle) {
//         return res.status(409).json({ error: 'An article with this slug already exists' })
//       }
      
//       // Create the new article
//       const article = await prisma.article.create({
//         data: {
//           title,
//           description,
//           author,
//           date: new Date(date),
//           content,
//           slug
//         }
//       })
      
//       return res.status(201).json(article)
//     } catch (error) {
//       console.error('Error creating article:', error)
//       return res.status(500).json({ error: 'Failed to create article' })
//     }
//   } 
//   // Handle unsupported methods
//   else {
//     return res.status(405).json({ error: 'Method not allowed' })
//   }
// }
