export interface User {
  id: string
  name: string
  email: string
  role: 'farmer' | 'buyer' | 'admin' | 'staff'
  avatar?: string
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
}