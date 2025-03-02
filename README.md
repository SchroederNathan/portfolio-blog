# Personal Blog with Next.js, PostgreSQL, and Prisma

A modern, performant blog built with Next.js, PostgreSQL, and Prisma. Features server-side rendering, image optimization, dark mode, and a clean, responsive design.

![Blog Preview](public/images/metadata-preview.jpg)

## 🚀 Features

- **Server-Side Rendering (SSR)** for optimal performance and SEO
- **Dark Mode Support** with system preference detection
- **MDX Support** for rich content creation
- **Image Optimization** using Next.js Image component
- **AWS S3 Integration** for image storage
- **PostgreSQL Database** with Prisma ORM
- **View Counter** for articles
- **Responsive Design** using TailwindCSS
- **TypeScript** for type safety

## 🛠 Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Prisma](https://www.prisma.io/) - ORM
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [MDX](https://mdxjs.com/) - Content
- [AWS S3](https://aws.amazon.com/s3/) - Image storage

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/SchroederNathan/portfolio-blog.git
cd portfolio-blog
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
# Create a .env file with the following variables
DATABASE_URL="postgresql://user:password@localhost:5432/blog"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
APP_AWS_ACCESS_KEY="your_aws_access_key"
APP_AWS_SECRET_KEY="your_aws_secret_key"
APP_AWS_REGION="your_aws_region"
AWS_S3_BUCKET_NAME="your_bucket_name"
```

4. Set up the database:

```bash
npx prisma migrate dev
```

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## 📝 Project Structure

```bash
/src
    /app # Next.js 13+ app directory
    /components # Reusable React components
    /lib # Utility functions and configurations
    /pages/api # API routes for data operations
/prisma
    schema.prisma # Database schema
```

## 💾 Database Schema

```prisma
model Article {
    id          Int      @id @default(autoincrement())
    slug        String   @unique
    title       String
    description String
    author      String
    viewCount   Int      @default(0)
    date        DateTime
    draft       Boolean  @default(true)
    content     String   @db.Text
    createdAt   DateTime @default(now())
    updatedAt   DateTime @updatedAt

    @@index([date])
}
```

## 🔑 API Routes

- `POST /api/articles/createArticle` - Create a new article
- `PUT /api/articles/[id]/updateArticle` - Update an existing article
- `POST /api/articles/[id]/incrementViewCount` - Increment article view count
- `POST /api/articles/uploadImage` - Upload image to S3

## 🎨 Styling

The project uses TailwindCSS for styling with a custom configuration:

- Custom color scheme
- Dark mode support
- Responsive design
- Typography plugin for content

## 📸 Image Handling

Images are stored in AWS S3 and served through Next.js Image component:

- Automatic optimization
- Lazy loading
- Responsive sizes
- Proper caching

## 🚀 Deployment

The blog is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy

## 🔒 Security

- AWS S3 presigned URLs for secure image uploads
- Environment variables for sensitive data
- Type-safe database operations with Prisma

## 📈 Performance

The blog implements several optimizations:

- Server-side rendering for fast initial loads
- Image optimization
- Code splitting
- CSS purging
- View count debouncing
- Database indexing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👤 Author

**Nathan Schroeder**

- Website: [nathanschroeder.dev](https://nathanschroeder.dev)
- Twitter: [@nater02](https://twitter.com/nater02)
- Github: [@SchroederNathan](https://github.com/SchroederNathan)
- LinkedIn: [Nathan Schroeder](https://www.linkedin.com/in/nathan-schroeder-a40aa2210/)

## 🙏 Acknowledgments

- [Tailwind UI](https://tailwindui.com/) for design inspiration
- [Next.js](https://nextjs.org/) team for the amazing framework
- [Prisma](https://www.prisma.io/) team for the excellent ORM
