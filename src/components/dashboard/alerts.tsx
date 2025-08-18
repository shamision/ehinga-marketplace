"use client"

import React from 'react'
import { AlertTriangle, Info, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Alert {
  id: string
  type: 'warning' | 'danger' | 'info'
  title: string
  description: string
  location?: string
}

const alerts: Alert[] = [
  {
    id: '1',
    type: 'danger',
    title: 'LOW STOCK ALERT',
    description: 'Maize inventory in Northern Province (Musanze, Burera) - Only 5 tons remaining',
    location: 'Northern Province'
  },
  {
    id: '2',
    type: 'info',
    title: 'PRICE FLUCTUATION',
    description: 'Coffee prices - Market rate: 850-950 RWF/kg (Standard range: 800-900 RWF/kg)',
    location: 'Western Province'
  },
  {
    id: '3',
    type: 'warning',
    title: 'HIGH DEMAND',
    description: 'Bean demand surge - Orders increased by 35% in the last 7 days',
    location: 'Kigali City'
  }
]

const alertIcons = {
  danger: AlertCircle,
  warning: AlertTriangle,
  info: Info
}

const alertColors = {
  danger: 'text-red-400 bg-red-950/50 border-red-900/50',
  warning: 'text-orange-400 bg-orange-950/50 border-orange-900/50',
  info: 'text-blue-400 bg-blue-950/50 border-blue-900/50'
}

export function ActiveAlerts() {
  return (
    <Card className={cn("bg-gradient-to-br from-orange-950/30 to-red-950/30 border-orange-900/50")}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <AlertTriangle className="w-5 h-5" />
          Active Market Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alertIcons[alert.type]
          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border",
                alertColors[alert.type]
              )}
            >
              <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{alert.title}</p>
                <p className="text-xs opacity-90 mt-1">{alert.description}</p>
                {alert.location && (
                  <p className="text-xs opacity-75 mt-1">📍 {alert.location}</p>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}