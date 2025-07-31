export default function getContrastColor(bgColor: string) {
  // Strip the hash if present
  const hex = bgColor.replace('#', '')

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 2), 16)
  const b = parseInt(hex.substring(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black or white depending on luminance
  return luminance > 0.5 ? '#000000' : '#ffffff'
}
