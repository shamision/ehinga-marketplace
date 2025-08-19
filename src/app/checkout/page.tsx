"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Input } from "../../../components/ui/input";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ShoppingCart,
  CreditCard,
  Smartphone,
  CheckCircle,
  XCircle,
  Loader2,
  MapPin,
  Package,
  Calendar,
  Phone,
  User,
  Shield,
  Lock,
  Eye,
} from "lucide-react";
import { CartItem, Order, PaymentMethod } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "details" | "payment" | "processing" | "success" | "failed"
  >("details");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    deliveryAddress: "",
    deliveryInstructions: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "momo" | "airtel" | null
  >(null);
  const [paymentPhone, setPaymentPhone] = useState("");
  const [paymentPin, setPaymentPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<
    "pending" | "processing" | "completed" | "failed"
  >("pending");
  const [orderId, setOrderId] = useState("");

  // Simulate cart data from URL params or localStorage
  useEffect(() => {
    // In a real app, this would come from context or API
    const mockCart: CartItem[] = [
      {
        id: "1",
        productId: "1",
        product: {
          id: "1",
          name: "Maize",
          category: "Grains",
          price: 300,
          unit: "kg",
          quantity: 50,
          producer: "Kigali Farmers Cooperative",
          location: "Kigali City",
          status: "available",
          description: "Fresh organic maize",
          image: "🌽",
          quality: "premium",
        },
        quantity: 50,
        addedAt: new Date(),
      },
      {
        id: "2",
        productId: "4",
        product: {
          id: "4",
          name: "Beans",
          category: "Legumes",
          price: 800,
          unit: "kg",
          quantity: 25,
          producer: "Southern Bean Farmers",
          location: "Southern Province",
          status: "available",
          description: "Red kidney beans",
          image: "🫘",
          quality: "standard",
        },
        quantity: 25,
        addedAt: new Date(),
      },
    ];
    setCart(mockCart);
  }, []);

  const getCartTotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone && formData.deliveryAddress) {
      setCurrentStep("payment");
    }
  };

  const handlePaymentMethodSelect = (method: "momo" | "airtel") => {
    setSelectedPaymentMethod(method);
    setPaymentPhone(formData.phone); // Pre-fill with delivery phone
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod || !paymentPhone || !paymentPin) return;

    setCurrentStep("processing");
    setPaymentStatus("processing");

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Simulate payment success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      setPaymentStatus("completed");
      setOrderId(`ORD-${Date.now().toString().slice(-8)}`);
      setCurrentStep("success");
    } else {
      setPaymentStatus("failed");
      setCurrentStep("failed");
    }
  };

  const getPaymentMethodInfo = (method: "momo" | "airtel") => {
    if (method === "momo") {
      return {
        name: "MTN Mobile Money (Momo)",
        icon: "📱",
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/10",
        instructions: [
          "Enter your Momo phone number",
          "Enter your Momo PIN",
          "You will receive a USSD prompt on your phone",
          "Confirm the transaction on your phone",
        ],
      };
    } else {
      return {
        name: "Airtel Money",
        icon: "📱",
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        instructions: [
          "Enter your Airtel Money phone number",
          "Enter your Airtel Money PIN",
          "You will receive a USSD prompt on your phone",
          "Confirm the transaction on your phone",
        ],
      };
    }
  };

  const renderPaymentMethod = () => {
    const momoInfo = getPaymentMethodInfo("momo");
    const airtelInfo = getPaymentMethodInfo("airtel");

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPaymentMethod === "momo" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handlePaymentMethodSelect("momo")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${momoInfo.color}`}>
                  {momoInfo.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{momoInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    MTN Mobile Money
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPaymentMethod === "airtel" ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handlePaymentMethodSelect("airtel")}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`text-2xl ${airtelInfo.color}`}>
                  {airtelInfo.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{airtelInfo.name}</h3>
                  <p className="text-sm text-muted-foreground">Airtel Money</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {selectedPaymentMethod && (
          <Card className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>
                  Secure payment via{" "}
                  {selectedPaymentMethod === "momo"
                    ? "MTN Momo"
                    : "Airtel Money"}
                </span>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={paymentPhone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPaymentPhone(e.target.value)
                    }
                    placeholder="07X XXX XXXX"
                    className="font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    PIN
                  </label>
                  <div className="relative">
                    <Input
                      type={showPin ? "text" : "password"}
                      value={paymentPin}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPaymentPin(e.target.value)
                      }
                      placeholder="Enter your PIN"
                      maxLength={4}
                      className="font-mono pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-0 top-0 h-full px-3"
                    >
                      {showPin ? (
                        <XCircle className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    getPaymentMethodInfo(selectedPaymentMethod).bgColor
                  }`}
                >
                  <h4 className="font-medium mb-2">Payment Instructions:</h4>
                  <ul className="text-sm space-y-1">
                    {getPaymentMethodInfo(
                      selectedPaymentMethod
                    ).instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Pay {getCartTotal().toLocaleString()} RWF
                </Button>
              </form>
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderProcessing = () => (
    <div className="text-center py-12">
      <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
      <h3 className="text-xl font-semibold mb-2">Processing Payment</h3>
      <p className="text-muted-foreground mb-4">
        Please wait while we process your payment via{" "}
        {selectedPaymentMethod === "momo" ? "MTN Momo" : "Airtel Money"}...
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p>• Checking payment status</p>
        <p>• Verifying transaction</p>
        <p>• Confirming order</p>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center py-12">
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
      <p className="text-muted-foreground mb-4">
        Your order has been confirmed and payment received.
      </p>
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
        <p className="text-sm text-green-500 font-medium">
          Order ID: {orderId}
        </p>
        <p className="text-sm text-green-500">
          Amount: {getCartTotal().toLocaleString()} RWF
        </p>
        <p className="text-sm text-green-500">
          Payment Method:{" "}
          {selectedPaymentMethod === "momo" ? "MTN Momo" : "Airtel Money"}
        </p>
      </div>
      <div className="space-y-3">
        <Button onClick={() => router.push("/marketplace")} className="w-full">
          Continue Shopping
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="w-full"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );

  const renderFailed = () => (
    <div className="text-center py-12">
      <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
      <p className="text-muted-foreground mb-4">
        We couldn't process your payment. Please try again or contact support.
      </p>
      <div className="space-y-3">
        <Button onClick={() => setCurrentStep("payment")} className="w-full">
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/marketplace")}
          className="w-full"
        >
          Back to Marketplace
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/marketplace")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  {currentStep === "details" && "Delivery Details"}
                  {currentStep === "payment" && "Payment Method"}
                  {currentStep === "processing" && "Processing Payment"}
                  {currentStep === "success" && "Payment Successful"}
                  {currentStep === "failed" && "Payment Failed"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentStep === "details" && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Full Name
                        </label>
                        <Input
                          value={formData.fullName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData((prev) => ({
                              ...prev,
                              fullName: e.target.value,
                            }))
                          }
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="07X XXX XXXX"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email (Optional)
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Delivery Address
                      </label>
                      <Input
                        value={formData.deliveryAddress}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            deliveryAddress: e.target.value,
                          }))
                        }
                        placeholder="Enter your delivery address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Delivery Instructions (Optional)
                      </label>
                      <Input
                        value={formData.deliveryInstructions}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setFormData((prev) => ({
                            ...prev,
                            deliveryInstructions: e.target.value,
                          }))
                        }
                        placeholder="Any special delivery instructions"
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">
                      Continue to Payment
                    </Button>
                  </form>
                )}

                {currentStep === "payment" && renderPaymentMethod()}
                {currentStep === "processing" && renderProcessing()}
                {currentStep === "success" && renderSuccess()}
                {currentStep === "failed" && renderFailed()}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="text-2xl">{item.product.image}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} {item.product.unit} ×{" "}
                          {item.product.price.toLocaleString()} RWF
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        {(item.product.price * item.quantity).toLocaleString()}{" "}
                        RWF
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>{getCartTotal().toLocaleString()} RWF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery:</span>
                    <span className="text-green-500">Free</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">
                        {getCartTotal().toLocaleString()} RWF
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Package className="w-4 h-4" />
                    <span>Delivery Information</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Standard delivery: 2-3 business days
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Free delivery for orders above 10,000 RWF
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
