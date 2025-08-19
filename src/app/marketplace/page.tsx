"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart as ShoppingCartComponent } from "@/components/marketplace/shopping-cart";
import {
  Search,
  Filter,
  Plus,
  Heart,
  ShoppingCart as ShoppingCartIcon,
  Star,
  MapPin,
  Calendar,
  Package,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Product, CartItem, ProductCategory, SearchFilters } from "@/types";

export default function MarketplacePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<
    "price" | "name" | "date" | "popularity"
  >("popularity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showCart, setShowCart] = useState(false);

  // Sample product data based on the agricultural products from your image
  const sampleProducts: Product[] = [
    {
      id: "1",
      name: "Maize",
      category: "Grains",
      price: 300,
      unit: "kg",
      quantity: 1200,
      producer: "Kigali Farmers Cooperative",
      location: "Kigali City",
      status: "available",
      description:
        "Fresh organic maize harvested this season. High quality grain suitable for both human consumption and animal feed.",
      image: "🌽",
      minOrder: 10,
      maxOrder: 500,
      harvestDate: "2024-08-15",
      quality: "premium",
    },
    {
      id: "2",
      name: "Wheat",
      category: "Grains",
      price: 450,
      unit: "kg",
      quantity: 800,
      producer: "Northern Wheat Farmers",
      location: "Northern Province",
      status: "available",
      description:
        "Premium wheat grain with high protein content. Perfect for bread making and pasta production.",
      image: "🌾",
      minOrder: 25,
      maxOrder: 300,
      harvestDate: "2024-08-10",
      quality: "premium",
    },
    {
      id: "3",
      name: "Rice",
      category: "Grains",
      price: 650,
      unit: "kg",
      quantity: 600,
      producer: "Eastern Rice Collective",
      location: "Eastern Province",
      status: "available",
      description:
        "Long grain rice with excellent cooking properties. Clean, well-milled rice ready for consumption.",
      image: "🍚",
      minOrder: 5,
      maxOrder: 200,
      harvestDate: "2024-08-12",
      quality: "standard",
    },
    {
      id: "4",
      name: "Beans",
      category: "Legumes",
      price: 800,
      unit: "kg",
      quantity: 750,
      producer: "Southern Bean Farmers",
      location: "Southern Province",
      status: "available",
      description:
        "Red kidney beans rich in protein and fiber. Clean, sorted beans perfect for cooking.",
      image: "🫘",
      minOrder: 5,
      maxOrder: 150,
      harvestDate: "2024-08-08",
      quality: "standard",
    },
    {
      id: "5",
      name: "Tomatoes",
      category: "Vegetables",
      price: 250,
      unit: "kg",
      quantity: 400,
      producer: "Kigali Vegetable Hub",
      location: "Kigali City",
      status: "available",
      description:
        "Fresh, ripe tomatoes perfect for cooking and salads. Grown using sustainable farming methods.",
      image: "🍅",
      minOrder: 2,
      maxOrder: 100,
      harvestDate: "2024-08-16",
      quality: "premium",
    },
    {
      id: "6",
      name: "Bananas",
      category: "Fruits",
      price: 180,
      unit: "kg",
      quantity: 900,
      producer: "Western Banana Cooperative",
      location: "Western Province",
      status: "available",
      description:
        "Sweet, ripe bananas perfect for eating or cooking. Available in various ripeness levels.",
      image: "🍌",
      minOrder: 5,
      maxOrder: 200,
      harvestDate: "2024-08-14",
      quality: "standard",
    },
    {
      id: "7",
      name: "Coffee Beans",
      category: "Cash Crops",
      price: 950,
      unit: "kg",
      quantity: 500,
      producer: "Kigali Coffee Cooperative",
      location: "Kigali City",
      status: "available",
      description:
        "Premium Arabica coffee beans with rich flavor profile. Perfect for specialty coffee production.",
      image: "☕",
      minOrder: 1,
      maxOrder: 100,
      harvestDate: "2024-08-05",
      quality: "premium",
    },
    {
      id: "8",
      name: "Sweet Potatoes",
      category: "Root Vegetables",
      price: 200,
      unit: "kg",
      quantity: 650,
      producer: "Central Root Farmers",
      location: "Central Province",
      status: "available",
      description:
        "Fresh sweet potatoes rich in nutrients. Perfect for both human consumption and animal feed.",
      image: "🍠",
      minOrder: 10,
      maxOrder: 300,
      harvestDate: "2024-08-11",
      quality: "standard",
    },
  ];

  const categories: ProductCategory[] = [
    {
      id: "all",
      name: "All Products",
      description: "Browse all available products",
      icon: "🛍️",
    },
    {
      id: "grains",
      name: "Grains",
      description: "Maize, wheat, rice, and other grains",
      icon: "🌾",
    },
    {
      id: "legumes",
      name: "Legumes",
      description: "Beans, peas, and other legumes",
      icon: "🫘",
    },
    {
      id: "vegetables",
      name: "Vegetables",
      description: "Fresh vegetables and greens",
      icon: "🥬",
    },
    {
      id: "fruits",
      name: "Fruits",
      description: "Fresh fruits and berries",
      icon: "🍎",
    },
    {
      id: "cash-crops",
      name: "Cash Crops",
      description: "Coffee, tea, and other cash crops",
      icon: "☕",
    },
    {
      id: "root-vegetables",
      name: "Root Vegetables",
      description: "Potatoes, cassava, and other roots",
      icon: "🥔",
    },
  ];

  useEffect(() => {
    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [searchTerm, filters, selectedCategory, sortBy, sortOrder, products]);

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(
        (product) =>
          product.price >= filters.priceRange![0] &&
          product.price <= filters.priceRange![1]
      );
    }

    // Quality filter
    if (filters.quality) {
      filtered = filtered.filter(
        (product) => product.quality === filters.quality
      );
    }

    // Availability filter
    if (filters.availability !== undefined) {
      filtered = filtered.filter((product) =>
        filters.availability ? product.status === "available" : true
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "price":
          comparison = a.price - b.price;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "date":
          comparison =
            new Date(a.harvestDate || "").getTime() -
            new Date(b.harvestDate || "").getTime();
          break;
        case "popularity":
          comparison = a.quantity - b.quantity;
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.productId === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: Date.now().toString(),
        productId: product.id,
        product,
        quantity: 1,
        addedAt: new Date(),
      };
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (productId: string): void => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(
        cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleCheckout = () => {
    // Navigate to checkout page with cart data
    const cartData = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `/checkout?cart=${cartData}`;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Cart */}
        <header className="bg-card border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-card-foreground">
              Marketplace
            </h1>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                className="relative"
                onClick={() => {
                  /* TODO: Show wishlist */
                }}
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="relative"
                onClick={() => setShowCart(true)}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </Button>
              {cart.length > 0 && (
                <Button onClick={handleCheckout} className="gap-2">
                  Checkout ({getCartTotal().toLocaleString()} RWF)
                </Button>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full"
                />
              </div>

              {/* Filters Toggle */}
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {showFilters ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>

                {/* Sort Options */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split("-");
                    setSortBy(sort as any);
                    setSortOrder(order as any);
                  }}
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="popularity-desc">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="date-desc">Newest First</option>
                </select>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <Card className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Price Range (RWF)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [
                                parseInt(e.target.value) || 0,
                                prev.priceRange?.[1] || 1000,
                              ],
                            }))
                          }
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              priceRange: [
                                prev.priceRange?.[0] || 0,
                                parseInt(e.target.value) || 1000,
                              ],
                            }))
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Quality
                      </label>
                      <select
                        value={filters.quality || ""}
                        onChange={(e) =>
                          setFilters((prev) => ({
                            ...prev,
                            quality: e.target.value || undefined,
                          }))
                        }
                        className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">All Qualities</option>
                        <option value="premium">Premium</option>
                        <option value="standard">Standard</option>
                        <option value="basic">Basic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Availability
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filters.availability || false}
                          onChange={(e) =>
                            setFilters((prev) => ({
                              ...prev,
                              availability: e.target.checked,
                            }))
                          }
                          className="rounded border-border"
                        />
                        <span className="text-sm">Available Only</span>
                      </label>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="hover:shadow-lg transition-shadow group"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="text-4xl">{product.image}</div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleWishlist(product.id)}
                          className={`h-8 w-8 p-0 ${
                            wishlist.includes(product.id)
                              ? "text-red-500 hover:text-red-400"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              wishlist.includes(product.id)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                            {product.category}
                          </span>
                          <span className="bg-green-500/10 text-green-500 px-2 py-1 rounded-full text-xs">
                            {product.quality}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Price:
                          </span>
                          <span className="font-bold text-lg text-primary">
                            {product.price.toLocaleString()} RWF/{product.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Available:
                          </span>
                          <span className="text-sm font-medium">
                            {product.quantity.toLocaleString()} {product.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Location:
                          </span>
                          <span className="text-sm flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {product.location}
                          </span>
                        </div>
                        {product.harvestDate && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">
                              Harvest:
                            </span>
                            <span className="text-sm flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(
                                product.harvestDate
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <Button
                          onClick={() => addToCart(product)}
                          className="w-full gap-2"
                          disabled={product.status !== "available"}
                        >
                          <ShoppingCartIcon className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find what you're
                  looking for.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Shopping Cart Modal */}
      <ShoppingCartComponent
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />
    </div>
  );
}
