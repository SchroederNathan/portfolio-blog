'use client'

import { useEffect } from 'react'

export function ViewTracker({ articleId }: { articleId: number }) {
  useEffect(() => {
    const trackView = async () => {
      const viewKey = `article_view_${articleId}`
      const lastViewTime = localStorage.getItem(viewKey)
      const now = Date.now()

      // Only count a view if it's been more than 1 minute since the last view
      if (!lastViewTime || now - parseInt(lastViewTime) > 60 * 1000) {
        localStorage.setItem(viewKey, now.toString())

        try {
          await fetch(`/api/articles/${articleId}/incrementViewCount`, {
            method: 'POST',
          })
        } catch (error) {
          console.error('Error tracking view:', error)
        }
      }
    }

    trackView()
  }, [articleId])

  return null
}
