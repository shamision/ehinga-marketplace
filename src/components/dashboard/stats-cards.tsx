"use client"

import React from 'react'
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatCard {
  id: string
  title: string
  value: string
  subtitle: string
  icon: React.ReactNode
  trend?: 'up' | 'down' | 'stable'
  color: string
}

const statsData: StatCard[] = [
  {
    id: '1',
    title: 'Active Producer Groups',
    value: '127',
    subtitle: 'Registered Groups',
    icon: <Users className="w-6 h-6" />,
    trend: 'up',
    color: 'from-blue-950/30 to-indigo-950/30 border-blue-900/50'
  },
  {
    id: '2',
    title: 'Market Participation Rate',
    value: '98.7%',
    subtitle: 'Monthly Engagement',
    icon: <TrendingUp className="w-6 h-6" />,
    trend: 'up',
    color: 'from-green-950/30 to-emerald-950/30 border-green-900/50'
  },
  {
    id: '3',
    title: 'Trading Success Rate',
    value: '94.2%',
    subtitle: 'Completed Transactions',
    icon: <ShoppingCart className="w-6 h-6" />,
    trend: 'stable',
    color: 'from-purple-950/30 to-violet-950/30 border-purple-900/50'
  },
  {
    id: '4',
    title: 'Monthly Revenue',
    value: '2.3M',
    subtitle: 'RWF Total Volume',
    icon: <DollarSign className="w-6 h-6" />,
    trend: 'up',
    color: 'from-amber-950/30 to-orange-950/30 border-amber-900/50'
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat) => (
        <Card key={stat.id} className={cn("bg-gradient-to-br", stat.color)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {stat.icon}
                  {stat.trend && (
                    <TrendingUp className={cn(
                      "w-4 h-4",
                      stat.trend === 'up' ? "text-green-400" : 
                      stat.trend === 'down' ? "text-red-400" : 
                      "text-gray-400"
                    )} />
                  )}
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}