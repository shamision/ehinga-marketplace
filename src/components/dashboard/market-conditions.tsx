// src/components/dashboard/market-conditions.tsx
"use client"

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const marketData = [
  { name: 'Active Trading', value: 45, color: '#3b82f6' },
  { name: 'Processing', value: 25, color: '#10b981' },
  { name: 'Pending Orders', value: 15, color: '#f59e0b' },
  { name: 'Issues', value: 10, color: '#ef4444' },
  { name: 'Completed', value: 5, color: '#6b7280' }
]

export function MarketConditions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🌤️ Current Market Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={marketData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {marketData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {marketData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span className="text-sm font-medium ml-auto">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// src/data/mockData.ts
export const mockAlerts = [
  {
    id: '1',
    type: 'danger' as const,
    title: 'LOW STOCK ALERT',
    description: 'Maize inventory in Northern Province (Musanze, Burera) - Only 5 tons remaining',
    location: 'Northern Province',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'info' as const,
    title: 'PRICE FLUCTUATION',
    description: 'Coffee prices - Market rate: 850-950 RWF/kg (Standard range: 800-900 RWF/kg)',
    location: 'Western Province',
    timestamp: new Date()
  },
  {
    id: '3',
    type: 'warning' as const,
    title: 'HIGH DEMAND',
    description: 'Bean demand surge - Orders increased by 35% in the last 7 days',
    location: 'Kigali City',
    timestamp: new Date()
  }
]

export const mockProducerGroups = [
  {
    id: '1',
    name: 'Kigali Coffee Cooperative',
    location: 'Kigali City',
    memberCount: 45,
    status: 'active' as const
  },
  {
    id: '2',
    name: 'Musanze Maize Farmers',
    location: 'Northern Province',
    memberCount: 67,
    status: 'active' as const
  },
  {
    id: '3',
    name: 'Huye Bean Collective',
    location: 'Southern Province',
    memberCount: 23,
    status: 'inactive' as const
  }
]

export const mockProducts = [
  {
    id: '1',
    name: 'Premium Coffee Beans',
    category: 'Coffee',
    price: 950,
    unit: 'kg',
    quantity: 500,
    producer: 'Kigali Coffee Cooperative',
    location: 'Kigali City',
    status: 'available' as const
  },
  {
    id: '2',
    name: 'Organic Maize',
    category: 'Cereals',
    price: 300,
    unit: 'kg',
    quantity: 1200,
    producer: 'Musanze Maize Farmers',
    location: 'Northern Province',
    status: 'available' as const
  }
]