export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://projectsss-backend-rj67lzs4p-tushar-27f5.vercel.app"

// Uploaded product/category images may be a bare filename (served from the
// backend's local /uploads folder) or a full URL (e.g. Vercel Blob), depending
// on which storage the upload went through.
export const getImageUrl = (file) => {
  if (!file) return ""
  if (/^https?:\/\//i.test(file)) return file
  return `${API_BASE_URL}/uploads/${file}`
}
