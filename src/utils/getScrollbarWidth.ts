export function getScrollbarWidth(): number {
  if (typeof window === 'undefined') return 0

  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'

  document.body.appendChild(outer)

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const width = outer.offsetWidth - inner.offsetWidth
  outer.remove()

  return width
}
