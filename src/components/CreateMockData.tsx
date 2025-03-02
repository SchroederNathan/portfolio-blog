'use client'
import { useState } from 'react'
import { Button } from './Button'

const CreateMockData = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  const createMockArticle = async () => {
    setIsCreating(true)

    try {
      const response = await fetch('/api/articles/createArticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          imageUrl,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      const article = await response.json()
      console.log('Mock data created successfully')
      alert('Mock article created successfully!')

      // Clear the form
      setTitle('')
      setDescription('')
      setContent('')
      setImageUrl('')
      setSelectedImage(null)
    } catch (error) {
      console.error('Error creating mock data:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    } finally {
      setIsCreating(false)
    }
  }

  const createImage = async () => {
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
      <h1 className="mb-4 text-2xl font-bold">Create Mock Data</h1>
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
          <Button onClick={createImage} className="w-full hover:cursor-pointer">
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
        onClick={createMockArticle}
        disabled={isCreating}
        className="w-full hover:cursor-pointer"
      >
        {isCreating ? 'Creating...' : 'Create Mock Data'}
      </Button>
    </div>
  )
}

export default CreateMockData
