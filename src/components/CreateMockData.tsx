'use client'
import { useState } from 'react'
import { Button } from './Button'

const CreateMockData = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [content, setContent] = useState('')

  const createMockArticle = async () => {
    setIsCreating(true)
    try {
      const response = await fetch('/api/createarticle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Mock Article AGAIN',
          description: 'This is a mock article',
          author: 'John Doe',
          date: new Date().toISOString(),
          content: content,
          slug: `mock-article-${Date.now()}`, // Add timestamp to make slug unique
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
    <>
      <textarea
        placeholder="Enter article content (markdown)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="mb-4 w-full rounded border p-2 font-mono text-sm"
      />

      <Button onClick={createMockArticle} disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create Mock Data'}
      </Button>
    </>
  )
}

export default CreateMockData
