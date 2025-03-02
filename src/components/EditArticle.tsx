'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './Button'

interface EditArticleProps {
  article: {
    id: number
    title: string
    description: string
    content: string
    images: string[]
  }
}

const EditArticle = ({ article }: EditArticleProps) => {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)
  const [content, setContent] = useState(article.content)
  const [title, setTitle] = useState(article.title)
  const [description, setDescription] = useState(article.description)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState(article.images[0] || '')

  const updateArticle = async () => {
    setIsUpdating(true)

    try {
      const response = await fetch(
        `/api/articles/${article.id}/updateArticle`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            content,
            imageUrl,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Failed to update article')
      }

      const updatedArticle = await response.json()
      alert('Article updated successfully!')
      router.push('/') // Route back to home page
    } catch (error) {
      console.error('Error updating article:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    } finally {
      setIsUpdating(false)
    }
  }

  const uploadImage = async () => {
    if (!selectedImage) return

    try {
      // Get the presigned URL from our API
      const response = await fetch(
        `/api/articles/uploadImage?file=${encodeURIComponent(selectedImage.name)}`,
      )
      const { url, fields } = await response.json()

      // Create form data with the required fields
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', selectedImage)

      // Upload to S3
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      })

      if (uploadResponse.ok) {
        // Construct the final image URL
        const imageUrl = `${url}/${fields.key}`
        setImageUrl(imageUrl)
        alert('Image uploaded successfully!')
      } else {
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Failed to upload image'}`,
      )
    }
  }

  return (
    <div className="mb-12">
      <h1 className="mb-4 text-2xl font-bold">Edit Article</h1>
      <input
        type="text"
        placeholder="Enter article title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded border-1 border-zinc-700 p-2 text-sm"
      />
      <input
        type="text"
        placeholder="Enter article description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 w-full rounded border-1 border-zinc-700 p-2 text-sm"
      />
      <textarea
        placeholder="Enter article content (markdown)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="mb-4 w-full rounded border-1 border-zinc-700 p-2 text-sm"
      />

      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files?.[0] || null)}
          className="mb-2 w-full text-sm"
        />
        {selectedImage && (
          <Button onClick={uploadImage} className="w-full hover:cursor-pointer">
            Upload Image
          </Button>
        )}
        {imageUrl && (
          <div className="mt-2 text-sm text-green-600">
            Image uploaded! URL: {imageUrl}
          </div>
        )}
      </div>

      <Button
        onClick={updateArticle}
        disabled={isUpdating}
        className="w-full hover:cursor-pointer"
      >
        {isUpdating ? 'Updating...' : 'Update Article'}
      </Button>
    </div>
  )
}

export default EditArticle
