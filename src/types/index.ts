export interface Vehicle {
  slug: string
  name: string
  type: 'scooty' | 'bike'
  brand: string
  engine: string
  mileage: string
  priceDay: number
  priceWeek: number
  priceMonth: number
  deposit: number
  featured: boolean
  available: boolean
  description?: string
}

export interface Review {
  name: string
  location: string
  rating: number
  text: string
  date: string
}

export interface FAQ {
  question: string
  answer: string
}
