export interface User {
  id: string
  name: string
  email: string
  role: 'farmer' | 'buyer' | 'admin' | 'staff'
  avatar?: string
  phone?: string
  location?: string
}

export interface AlertItem {
  id: string
  type: 'warning' | 'danger' | 'info'
  title: string
  description: string
  location?: string
  timestamp: Date
}

export interface StatsCard {
  title: string
  value: string | number
  subtitle: string
  trend?: 'up' | 'down' | 'stable'
  icon: React.ReactNode
}

export interface ProducerGroup {
  id: string
  name: string
  location: string
  memberCount: number
  status: 'active' | 'inactive'
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  unit: string
  quantity: number
  producer: string
  location: string
  status: 'available' | 'sold' | 'expired'
  description?: string
  image?: string
  minOrder?: number
  maxOrder?: number
  harvestDate?: string
  quality?: 'premium' | 'standard' | 'basic'
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  addedAt: Date
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'momo' | 'airtel' | 'cash'
  createdAt: Date
  updatedAt: Date
  deliveryAddress?: string
  deliveryInstructions?: string
}

export interface PaymentMethod {
  id: string
  type: 'momo' | 'airtel'
  name: string
  phoneNumber: string
  isDefault: boolean
}

export interface PaymentTransaction {
  id: string
  orderId: string
  amount: number
  method: 'momo' | 'airtel'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  reference: string
  createdAt: Date
  completedAt?: Date
}

export interface ProductCategory {
  id: string
  name: string
  description: string
  icon: string
  parentId?: string
}

export interface SearchFilters {
  category?: string
  priceRange?: [number, number]
  location?: string
  quality?: string
  availability?: boolean
  sortBy?: 'price' | 'name' | 'date' | 'popularity'
  sortOrder?: 'asc' | 'desc'
}