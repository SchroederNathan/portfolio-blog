'use client'
import { useState } from 'react'
import { Button } from './Button'

const CreateMockData = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const createMockArticle = async () => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/createarticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description,
          author: 'Nathan Schroeder',
          date: new Date().toISOString(),
          content: content,
          draft: true,
          slug: title.toLowerCase().replace(/ /g, '-'),
        }),
      })

      if (response.ok) {
        console.log('Mock data created successfully')
        alert('Mock article created successfully!')
      } else {
        const error = await response.json()
        console.error('Failed to create mock data:', error)
        alert(`Failed to create mock data: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error creating mock data:', error)
      alert(
        `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      )
    } finally {
      setIsCreating(false)
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
