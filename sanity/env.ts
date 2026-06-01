export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-06-01'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

export const previewOrigin =
  process.env.NEXT_PUBLIC_SANITY_PREVIEW_ORIGIN || 'http://localhost:3000'

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ||
  `${previewOrigin.replace(/\/$/, '')}/studio/`

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
