import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface Props {
  images: string[]
  alt: string
  autoPlay?: boolean
  className?: string
}

const PLACEHOLDER = (
  <div className="w-full h-full flex flex-col items-center justify-center gap-3" style={{ background: 'var(--color-sun)', color: 'var(--color-ocean)' }}>
    <ImageOff className="w-12 h-12 opacity-40" />
    <span className="text-xs font-medium opacity-50">No image</span>
  </div>
)

export default function ImageCarousel({ images, alt, autoPlay = true, className = '' }: Props) {
  const [current, setCurrent] = useState(0)
  const [hovered, setHovered] = useState(false)
  const hasImages = images.length > 0

  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length])

  useEffect(() => {
    if (!autoPlay || hovered || images.length <= 1) return
    const id = setInterval(next, 3500)
    return () => clearInterval(id)
  }, [autoPlay, hovered, images.length, next])

  if (!hasImages) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {PLACEHOLDER}
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`${alt} ${current + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          draggable={false}
          loading="lazy"
        />
      </AnimatePresence>

      {/* Photo counter badge */}
      {images.length > 1 && (
        <div
          className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded-full"
          style={{ background: 'rgba(6,32,43,0.6)', color: 'white' }}
        >
          {current + 1}/{images.length}
        </div>
      )}

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-deep)' }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-deep)' }}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i) }}
              className="rounded-full transition-all duration-200"
              style={{
                width: i === current ? 16 : 6,
                height: 6,
                background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
              }}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
