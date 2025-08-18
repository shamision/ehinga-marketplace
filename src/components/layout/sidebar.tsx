// src/components/layout/sidebar.tsx
"use client"

import React from 'react'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  ShoppingCart, 
  Calendar,
  Settings,
  HelpCircle,
  MessageCircle
} from 'lucide-react'

interface SidebarProps {
  className?: string
}

const navigation = [
  {
    name: 'Operational Dashboard',
    href: '/',
    icon: BarChart3,
    description: 'Real-time monitoring'
  },
  {
    name: 'Marketplace',
    href: '/marketplace',
    icon: ShoppingCart,
    description: 'Trading platform'
  },
  {
    name: 'Chatbot',
    href: '/chatbot',
    icon: MessageCircle,
    description: 'AI assistant'
  }
]

export function Sidebar({ }: SidebarProps) {
  const pathname = usePathname()
  return (
    <div 
      className="w-80 h-screen overflow-hidden"
      style={{ 
        backgroundColor: '#1e293b',
        borderRight: '1px solid #334155'
      }}
    >
      {/* Logo and Time Section */}
      <div 
        className="p-6"
        style={{ 
          borderBottom: '1px solid #334155'
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: '#3b82f6' }}
          >
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">e-Hinga</h1>
            <p className="text-sm text-gray-400">Marketplace Platform</p>
          </div>
        </div>
        
        {/* Current Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-2xl font-mono text-white">01:03 PM</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Sunday, August 17</span>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div 
        className="p-6"
        style={{ 
          borderBottom: '1px solid #334155'
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
          >
            <span className="text-blue-400 font-semibold">WV</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              World Vision Staff
            </p>
            <p className="text-xs text-gray-400 truncate">
              admin@worldvision.rw
            </p>
          </div>
        </div>
      </div>

      {/* Removed location/current conditions block */}

      {/* Navigation */}
      <nav className="p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-slate-700"
                  style={{
                    backgroundColor: isActive ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                    color: isActive ? '#60a5fa' : '#94a3b8'
                  }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{item.name}</p>
                    <p className="text-xs opacity-75 truncate">{item.description}</p>
                  </div>
                  {isActive && (
                    <div 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: '#3b82f6' }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        {/* Bottom Navigation */}
        <div 
          className="mt-8 pt-4"
          style={{ 
            borderTop: '1px solid #334155'
          }}
        >
          <ul className="space-y-2">
            <li>
              <a
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help & Support</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}