export default function throttle(callback: (...args: any) => void, delay = 1000) {
  let shouldWait = false
  let lastArgs: any[] | null
  const timeoutFunction = () => {
    if (lastArgs == null) {
      shouldWait = false
    } else {
      callback(...lastArgs)
      lastArgs = null
      setTimeout(timeoutFunction, delay)
    }
  }
  return (...args: any[]) => {
    if (shouldWait) {
      lastArgs = args
      return
    }
    callback(...args)
    shouldWait = true
    setTimeout(timeoutFunction, delay)
  }
}
