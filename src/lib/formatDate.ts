export function formatDate(dateString: string) {
  return new Date(
    `${formatDateYYYYMMDD(dateString)}T00:00:00Z`,
  ).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function formatDateYYYYMMDD(dateString: string) {
  const date = new Date(dateString)

  // Get year, month, and day
  const year = date.getUTCFullYear()
  // getUTCMonth() returns 0-11, so add 1 to get 1-12
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = date.getUTCDate().toString().padStart(2, '0')

  // Format as YYYY-MM-DD
  return `${year}-${month}-${day}`
}
