export function logError(message: string) {
  if (process.env.NODE_ENV === 'test') {
    return
  }

  console.error(`‼ ${message}`)
}
