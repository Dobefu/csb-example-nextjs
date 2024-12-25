export function logError(message: string) {
  /* v8 ignore start */
  if (process.env.NODE_ENV === 'test') {
    return
  }
  /* v8 ignore end */

  console.error(`‼ ${message}`)
}
