// src/app/page.tsx
import React from 'react'
import { Sidebar } from '@/components/layout/sidebar'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-900">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">📊</div>
                  <div className="text-green-400">📈</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">127</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Active Producer Groups</div>
                <div className="text-blue-300/80 text-xs">Registered Groups</div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">🎯</div>
                  <div className="text-green-400">📈</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">98.7%</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Market Participation Rate</div>
                <div className="text-green-300/80 text-xs">Monthly Engagement</div>
              </div>

              {/* Card 3 */}
              <div className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border border-purple-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">✅</div>
                  <div className="text-green-400">📈</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">94.2%</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Trading Success Rate</div>
                <div className="text-purple-300/80 text-xs">Completed Transactions</div>
              </div>

              {/* Card 4 */}
              <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-800/50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">💰</div>
                  <div className="text-green-400">📈</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">2.3M</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Daily Data Requests</div>
                <div className="text-amber-300/80 text-xs">RWF Total Volume</div>
              </div>
            </div>

            {/* Bottom Section - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Trading Centers Status */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>📊</span>
                  Real-time Trading Centers Status
                </h3>
                
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 pb-3 mb-4 border-b border-slate-700">
                  <div className="text-sm font-medium text-slate-400">Trading Center</div>
                  <div className="text-sm font-medium text-slate-400">Province</div>
                  <div className="text-sm font-medium text-slate-400">Activity</div>
                  <div className="text-sm font-medium text-slate-400">Status</div>
                </div>
                
                {/* Table Rows */}
                <div className="space-y-3">
                  {[
                    { station: 'Kigali Central Market', province: 'Kigali City', temp: '24°C', status: 'Normal', time: '2 min ago' },
                    { station: 'Musanze Hub', province: 'Northern', temp: '18°C', status: 'Alert', time: '5 min ago' },
                    { station: 'Huye Collection Center', province: 'Southern', temp: '22°C', status: 'Normal', time: '3 min ago' },
                    { station: 'Rubavu Trading Post', province: 'Western', temp: '20°C', status: 'Warning', time: '1 min ago' }
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 items-center">
                      <div>
                        <div className="text-white text-sm font-medium">{item.station}</div>
                        <div className="text-slate-400 text-xs">{item.time}</div>
                      </div>
                      <div className="text-slate-300 text-sm">{item.province}</div>
                      <div className="text-white text-sm font-mono">{item.temp}</div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Normal' ? 'bg-green-900/50 text-green-400 border border-green-800' :
                          item.status === 'Alert' ? 'bg-yellow-900/50 text-yellow-400 border border-yellow-800' :
                          'bg-orange-900/50 text-orange-400 border border-orange-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Market Conditions */}
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>🌤️</span>
                  Current Market Conditions
                </h3>
                
                {/* Chart Area */}
                <div className="flex items-center justify-center h-48 mb-6">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 via-red-500 to-gray-500 p-1">
                      <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-sm font-semibold">Market</div>
                          <div className="text-slate-400 text-xs">Overview</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-3">
                  {[
                    { name: 'Active Trading', value: 45, color: 'bg-blue-500' },
                    { name: 'Processing', value: 25, color: 'bg-green-500' },
                    { name: 'Pending Orders', value: 15, color: 'bg-yellow-500' },
                    { name: 'Issues', value: 10, color: 'bg-red-500' },
                    { name: 'Completed', value: 5, color: 'bg-gray-500' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                        <span className="text-slate-300 text-sm">{item.name}</span>
                      </div>
                      <span className="text-white text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}