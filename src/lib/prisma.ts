import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof prismaClientWithAccelerate>
}

const prismaClientWithAccelerate = () =>
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  }).$extends(withAccelerate())

export const prisma = prismaClientWithAccelerate()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
