import manifest from '@/generated/fleet-manifest.json'

export function getFleetImages(slug: string): string[] {
  return (manifest as Record<string, string[]>)[slug] ?? []
}
