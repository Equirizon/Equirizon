'use server'

export default async function useTestAction(
  force?: 'fail' | 'success',
  ms: number = 1000,
): Promise<{ status: boolean }> {
  const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (force === 'fail') {
        reject('Rejected!')
      }
      if (force === 'success' || Math.random() < 0.5) {
        resolve('Accepted!')
      } else {
        reject('Rejected!')
      }
    }, ms)
  })
  const promised = await promise

  if (promised) {
    console.info('Promise Resolved!')
    return { status: true }
  }
  console.info('Promise Rejected!')
  return { status: false }
}
