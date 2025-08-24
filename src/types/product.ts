export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory?: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  tags: string[]
  specifications?: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  productCount: number
  subcategories?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'admin'
  createdAt: Date
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
} 