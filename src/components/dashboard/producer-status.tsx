"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProducerStatus {
  station: string
  province: string
  temp: string
  status: 'Normal' | 'Alert' | 'Warning'
  lastUpdate: string
}

const producerData: ProducerStatus[] = [
  {
    station: 'Kigali Central Market',
    province: 'Kigali City',
    temp: '24°C',
    status: 'Normal',
    lastUpdate: '2 min ago'
  },
  {
    station: 'Musanze Hub',
    province: 'Northern',
    temp: '18°C',
    status: 'Alert',
    lastUpdate: '5 min ago'
  },
  {
    station: 'Huye Collection Center',
    province: 'Southern',
    temp: '22°C',
    status: 'Normal',
    lastUpdate: '3 min ago'
  },
  {
    station: 'Rubavu Trading Post',
    province: 'Western',
    temp: '20°C',
    status: 'Warning',
    lastUpdate: '1 min ago'
  }
]

const statusColors = {
  Normal: 'bg-green-950/50 text-green-400 border-green-900',
  Alert: 'bg-yellow-950/50 text-yellow-400 border-yellow-900',
  Warning: 'bg-orange-950/50 text-orange-400 border-orange-900'
}

export function ProducerStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Real-time Trading Centers Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
            <div>Trading Center</div>
            <div>Province</div>
            <div>Activity</div>
            <div>Status</div>
          </div>
          {producerData.map((producer, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 text-sm items-center">
              <div>
                <p className="font-medium text-foreground">{producer.station}</p>
                <p className="text-xs text-muted-foreground">{producer.lastUpdate}</p>
              </div>
              <div className="text-muted-foreground">{producer.province}</div>
              <div className="font-mono text-foreground">{producer.temp}</div>
              <div>
                <Badge className={statusColors[producer.status]}>
                  {producer.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}