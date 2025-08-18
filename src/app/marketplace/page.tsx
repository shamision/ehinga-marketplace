import React from 'react'
import { Sidebar } from '@/components/layout/sidebar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Filter, Plus } from 'lucide-react'

export default function MarketplacePage() {
  const products = [
    {
      id: 1,
      name: 'Premium Coffee Beans',
      producer: 'Kigali Coffee Cooperative',
      price: '950 RWF/kg',
      quantity: '500 kg available',
      location: 'Kigali City',
      image: '☕'
    },
    {
      id: 2,
      name: 'Organic Maize',
      producer: 'Musanze Maize Farmers',
      price: '300 RWF/kg',
      quantity: '1,200 kg available',
      location: 'Northern Province',
      image: '🌽'
    },
    {
      id: 3,
      name: 'Fresh Beans',
      producer: 'Huye Bean Collective',
      price: '800 RWF/kg',
      quantity: '750 kg available',
      location: 'Southern Province',
      image: '🫘'
    }
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="text-4xl">{product.image}</div>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      by {product.producer}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price:</span>
                        <span className="font-medium">{product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Available:</span>
                        <span className="text-sm">{product.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Location:</span>
                        <span className="text-sm">{product.location}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      Place Order
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}