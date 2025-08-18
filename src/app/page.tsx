"use client"
// src/app/page.tsx
import React from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts'

export default function DashboardPage() {
  // Sample data for charts
  const monthlyRevenueData = [
    { month: 'Jan', revenue: 32000000, transactions: 145 },
    { month: 'Feb', revenue: 35000000, transactions: 167 },
    { month: 'Mar', revenue: 38000000, transactions: 189 },
    { month: 'Apr', revenue: 42000000, transactions: 203 },
    { month: 'May', revenue: 45200000, transactions: 234 },
  ]

  const valueChainData = [
    { name: 'Maize', value: 12300000, percentage: 27, color: '#F59E0B' },
    { name: 'Beans', value: 8700000, percentage: 19, color: '#10B981' },
    { name: 'Rice', value: 6100000, percentage: 13, color: '#3B82F6' },
    { name: 'Coffee', value: 4900000, percentage: 11, color: '#D97706' },
    { name: 'Potatoes', value: 3200000, percentage: 7, color: '#8B5CF6' },
    { name: 'Others', value: 10000000, percentage: 23, color: '#6B7280' }
  ]

  const provinceData = [
    { province: 'Eastern', groups: 34, volume: 15200000, producers: 687, fill: '#3B82F6' },
    { province: 'Northern', groups: 28, volume: 12800000, producers: 542, fill: '#10B981' },
    { province: 'Southern', groups: 31, volume: 11500000, producers: 623, fill: '#F59E0B' },
    { province: 'Western', groups: 24, volume: 8900000, producers: 445, fill: '#8B5CF6' },
    { province: 'Kigali', groups: 10, volume: 6300000, producers: 546, fill: '#EF4444' }
  ]

  const paymentMethodsData = [
    { method: 'MTN Mobile Money', percentage: 65, amount: 29300000, color: '#F59E0B' },
    { method: 'Airtel Money', percentage: 20, amount: 9000000, color: '#EF4444' },
    { method: 'Bank Transfer', percentage: 12, amount: 5400000, color: '#3B82F6' },
    { method: 'Cash', percentage: 3, amount: 1400000, color: '#10B981' }
  ]



  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-900">
          <div className="max-w-7xl mx-auto space-y-8">
            


            {/* Core Marketplace Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Active Producer Groups */}
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border border-blue-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="text-3xl">👥</div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">+12%</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">127</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Active Producer Groups</div>
                <div className="text-blue-300/80 text-xs">Across 29 districts</div>
              </div>

              {/* Total Producers */}
              <div className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border border-green-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-green-900/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="text-3xl">🧑‍🌾</div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">+8%</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">2,843</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Individual Producers</div>
                <div className="text-green-300/80 text-xs">Registered members</div>
              </div>

              {/* Active Listings */}
              <div className="bg-gradient-to-br from-purple-900/40 to-violet-800/40 border border-purple-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="text-3xl">🌾</div>
                  <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs font-medium">+23%</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">156</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Marketplace Listings</div>
                <div className="text-purple-300/80 text-xs">Active products</div>
              </div>

              {/* Monthly Revenue */}
              <div className="bg-gradient-to-br from-amber-900/40 to-orange-800/40 border border-amber-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-amber-900/20 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="text-3xl">💰</div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">+34%</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">45.2M</div>
                <div className="text-slate-300 text-sm font-medium mb-1">Monthly Revenue</div>
                <div className="text-amber-300/80 text-xs">RWF Total Volume</div>
              </div>
            </div>

            {/* Revenue Trend Chart & Value Chain Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Monthly Revenue Trend */}
              <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>📈</span>
                  Revenue Growth Trend
                </h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyRevenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'revenue' ? `${(value/1000000).toFixed(1)}M RWF` : value,
                        name === 'revenue' ? 'Revenue' : 'Transactions'
                      ]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Value Chain Distribution Pie Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>🥧</span>
                  Value Chain Distribution
                </h3>
                
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={valueChainData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="percentage"
                    >
                      {valueChainData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value, name, props) => [
                        `${value}% (${(props.payload.value/1000000).toFixed(1)}M RWF)`,
                        props.payload.name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Legend */}
                <div className="mt-4 space-y-2">
                  {valueChainData.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                        <span className="text-slate-300">{item.name}</span>
                      </div>
                      <span className="text-white font-medium">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Geographic Performance & Payment Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Geographic Distribution Bar Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>🗺️</span>
                  Provincial Performance
                </h3>
                
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={provinceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="province" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value: number, name: string) => [
                        name === 'volume' ? `${(value/1000000).toFixed(1)}M RWF` : value,
                        name === 'volume' ? 'Trading Volume' : 
                        name === 'groups' ? 'Producer Groups' : 'Producers'
                      ]}
                    />
                    <Bar dataKey="volume" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Payment Methods Radial Chart */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>💳</span>
                  Payment Methods Usage
                </h3>
                
                <ResponsiveContainer width="100%" height={240}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={paymentMethodsData}>
                    <RadialBar 
                      dataKey="percentage" 
                      cornerRadius={10} 
                      fill="#3B82F6"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }}
                      formatter={(value, name, props) => [
                        `${value}% (${(props.payload.amount/1000000).toFixed(1)}M RWF)`,
                        props.payload.method
                      ]}
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
                
                <div className="mt-4 space-y-3">
                  {paymentMethodsData.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: payment.color }}></div>
                        <span className="text-slate-300 text-sm">{payment.method}</span>
                      </div>
                      <span className="text-white font-medium">{payment.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* THRIVE 2030 Enhanced Dashboard & Recent Trading Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* THRIVE 2030 Impact Metrics - Enhanced */}
              <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>🎯</span>
                  THRIVE 2030 Impact Dashboard
                </h3>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      indicator: "Business Plans",
                      current: 89,
                      target: 100,
                      unit: "%",
                      icon: "📋",
                      color: "from-blue-500 to-cyan-500",
                      bgColor: "bg-blue-900/20 border-blue-700/50"
                    },
                    {
                      indicator: "Women Participation", 
                      current: 67,
                      target: 70,
                      unit: "%",
                      icon: "👩‍🌾",
                      color: "from-pink-500 to-rose-500",
                      bgColor: "bg-pink-900/20 border-pink-700/50"
                    },
                    {
                      indicator: "Youth Inclusion",
                      current: 23,
                      target: 30, 
                      unit: "%",
                      icon: "👨‍🎓",
                      color: "from-green-500 to-emerald-500",
                      bgColor: "bg-green-900/20 border-green-700/50"
                    },
                    {
                      indicator: "PWDs Inclusion",
                      current: 12,
                      target: 15,
                      unit: "%",
                      icon: "♿",
                      color: "from-purple-500 to-violet-500",
                      bgColor: "bg-purple-900/20 border-purple-700/50"
                    }
                  ].map((metric, index) => (
                    <div key={index} className={`p-4 border rounded-lg ${metric.bgColor} relative overflow-hidden`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl">{metric.icon}</span>
                        <span className="text-2xl font-bold text-white">{metric.current}{metric.unit}</span>
                      </div>
                      <div className="mb-2">
                        <div className="text-slate-300 text-sm font-medium">{metric.indicator}</div>
                        <div className="text-slate-400 text-xs">Target: {metric.target}{metric.unit}</div>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-1000`}
                            style={{ width: `${(metric.current / metric.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional THRIVE metrics */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">94.2%</div>
                      <div className="text-sm text-slate-300">Market Access Rate</div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">78%</div>
                      <div className="text-sm text-slate-300">Training Completion</div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">456K</div>
                      <div className="text-sm text-slate-300">Avg Monthly Income</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Trading Activity - Enhanced */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>🔄</span>
                  Live Trading Feed
                </h3>
                
                <div className="space-y-4">
                  {[
                    { 
                      producer: "Umwalimu Coop", 
                      product: "Maize", 
                      quantity: "5T",
                      buyer: "Minimex Ltd",
                      status: "Completed",
                      value: "2.5M",
                      time: "2h",
                      statusColor: "bg-green-500",
                      avatar: "🌽"
                    },
                    {
                      producer: "Abadahemuka",
                      product: "Beans", 
                      quantity: "2T",
                      buyer: "Local Market",
                      status: "Processing", 
                      value: "1.2M",
                      time: "4h",
                      statusColor: "bg-yellow-500",
                      avatar: "🫘"
                    },
                    {
                      producer: "Dufatanye",
                      product: "Rice", 
                      quantity: "3.5T",
                      buyer: "SINA Ltd",
                      status: "Pending", 
                      value: "1.8M",
                      time: "6h",
                      statusColor: "bg-blue-500",
                      avatar: "🍚"
                    },
                    {
                      producer: "Ubwiyunge",
                      product: "Coffee", 
                      quantity: "1T",
                      buyer: "Export Co",
                      status: "Completed", 
                      value: "3.2M",
                      time: "8h",
                      statusColor: "bg-green-500",
                      avatar: "☕"
                    }
                  ].map((trade, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-colors duration-200 border border-slate-600/30">
                      <div className="text-2xl">{trade.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-white font-medium text-sm truncate">{trade.producer}</div>
                          <div className="text-white font-semibold text-sm">{trade.value} RWF</div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-slate-400">{trade.product} • {trade.quantity} → {trade.buyer}</div>
                          <div className="text-slate-500">{trade.time}</div>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${trade.statusColor}`}></div>
                    </div>
                  ))}
                </div>

                {/* Quick stats */}
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">23</div>
                      <div className="text-xs text-slate-400">Today&apos;s Trades</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">12.4M</div>
                      <div className="text-xs text-slate-400">Daily Volume</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Intelligence & System Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Market Intelligence Dashboard */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>📊</span>
                  Market Intelligence Hub
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-400 text-xs font-medium">PRICE TREND</span>
                    </div>
                    <div className="text-white text-xl font-bold">↑ 12%</div>
                    <div className="text-slate-400 text-xs">Maize vs last month</div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-400 text-xs font-medium">DEMAND</span>
                    </div>
                    <div className="text-white text-xl font-bold">High</div>
                    <div className="text-slate-400 text-xs">Next 3 months</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🆕</span>
                      <span className="text-slate-300 text-sm">New Buyers This Month</span>
                    </div>
                    <span className="text-green-400 font-bold">+18</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📈</span>
                      <span className="text-slate-300 text-sm">Market Growth Rate</span>
                    </div>
                    <span className="text-blue-400 font-bold">+23%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🔄</span>
                      <span className="text-slate-300 text-sm">Repeat Customer Rate</span>
                    </div>
                    <span className="text-purple-400 font-bold">76.8%</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⭐</span>
                      <span className="text-slate-300 text-sm">Quality Rating</span>
                    </div>
                    <span className="text-yellow-400 font-bold">4.8/5</span>
                  </div>
                </div>
              </div>

              {/* System Performance & Analytics */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <span>⚡</span>
                  System Performance Monitor
                </h3>
                
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-green-400 mb-1">99.8%</div>
                      <div className="text-sm text-slate-300">Uptime</div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-300">Online</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full -mr-8 -mt-8"></div>
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-blue-400 mb-1">145ms</div>
                      <div className="text-sm text-slate-300">Response Time</div>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-blue-300">Optimal</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live System Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg border border-slate-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">👥</span>
                      </div>
                      <span className="text-slate-300 text-sm">Active Users</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">1,247</div>
                      <div className="text-xs text-green-400">+5.2%</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg border border-slate-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">🔄</span>
                      </div>
                      <span className="text-slate-300 text-sm">Data Sync Status</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">Real-time</div>
                      <div className="text-xs text-purple-400">Synced</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg border border-slate-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">📊</span>
                      </div>
                      <span className="text-slate-300 text-sm">API Requests</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">234K</div>
                      <div className="text-xs text-orange-400">Today</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-700/40 rounded-lg border border-slate-600/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-sm">🗄️</span>
                      </div>
                      <span className="text-slate-300 text-sm">Database Size</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold">2.3GB</div>
                      <div className="text-xs text-red-400">Growing</div>
                    </div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-400">24/7</div>
                      <div className="text-xs text-slate-400">Monitoring</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-400">Zero</div>
                      <div className="text-xs text-slate-400">Downtime</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">100%</div>
                      <div className="text-xs text-slate-400">Data Integrity</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity Building Progress */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:shadow-lg hover:shadow-slate-800/50 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <span>🎓</span>
                Training & Capacity Building Progress
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { 
                    module: "iMSD Training", 
                    completed: 78, 
                    total: 127, 
                    color: "#3B82F6", 
                    icon: "📚",
                    description: "Market System Development"
                  },
                  { 
                    module: "iMKA Modules", 
                    completed: 89, 
                    total: 127, 
                    color: "#10B981", 
                    icon: "🧠",
                    description: "Market Knowledge Access"
                  },
                  { 
                    module: "S4Ts (PG+)", 
                    completed: 45, 
                    total: 89, 
                    color: "#8B5CF6", 
                    icon: "🎯",
                    description: "Savings for Transformation"
                  },
                  { 
                    module: "Value Chain", 
                    completed: 67, 
                    total: 98, 
                    color: "#F59E0B", 
                    icon: "⛓️",
                    description: "Production Training"
                  }
                ].map((training, index) => (
                  <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-colors duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">{training.icon}</div>
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{training.module}</div>
                        <div className="text-slate-400 text-xs">{training.description}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300 text-sm">Progress</span>
                        <span className="text-white font-bold text-sm">{training.completed}/{training.total}</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-3 relative overflow-hidden">
                        <div 
                          className="h-3 rounded-full transition-all duration-1000 relative"
                          style={{ 
                            width: `${(training.completed / training.total) * 100}%`,
                            backgroundColor: training.color
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white" style={{ color: training.color }}>
                        {Math.round((training.completed / training.total) * 100)}%
                      </div>
                      <div className="text-xs text-slate-400">Completion Rate</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Training Summary Stats */}
              <div className="mt-6 pt-6 border-t border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="text-xl font-bold text-blue-400">279</div>
                    <div className="text-sm text-slate-300">Total Trainees</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="text-xl font-bold text-green-400">87%</div>
                    <div className="text-sm text-slate-300">Avg Completion</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="text-xl font-bold text-purple-400">24</div>
                    <div className="text-sm text-slate-300">Active Trainers</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/40 rounded-lg">
                    <div className="text-xl font-bold text-orange-400">156h</div>
                    <div className="text-sm text-slate-300">Training Hours</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}