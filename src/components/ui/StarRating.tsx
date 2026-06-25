import { Star } from 'lucide-react'

interface Props {
  rating: number
  max?: number
  size?: number
}

export default function StarRating({ rating, max = 5, size = 16 }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={i < rating ? 'fill-current' : 'opacity-20'}
          color={i < rating ? '#FDEB9E' : 'currentColor'}
          fill={i < rating ? '#FDEB9E' : 'none'}
        />
      ))}
    </div>
  )
}
