export default function debounce(callback: (...args: any) => void, delay = 1000) {
  let timeout: any
  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
