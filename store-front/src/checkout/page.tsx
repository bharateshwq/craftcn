'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/header';
import { SectionContainer } from '@/components/section-container';
import { CheckoutSteps } from '@/components/checkout-steps';
import { AddressSelector } from '@/components/address-selector';
import { ShippingOptions } from '@/components/shipping-options';
import { CartSummary } from '@/components/cart-summary';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useStore } from '@/context/store-context';
import { shippingOptions } from '@/lib/mock-data';

const CHECKOUT_STEPS = ['Address', 'Shipping', 'Payment'];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, addresses, getCartTotal, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || '');
  const [selectedShippingId, setSelectedShippingId] = useState(shippingOptions[0]?.id || '');
  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router]);

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // In a real app, this would process the payment
    alert('Order placed successfully!');
    clearCart();
    router.push('/');
  };

  const shippingCost = shippingOptions.find((opt) => opt.id === selectedShippingId)?.price || 0;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <SectionContainer>
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        {/* Checkout Steps */}
        <CheckoutSteps currentStep={currentStep} steps={CHECKOUT_STEPS} className="mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Address */}
            {currentStep === 0 && (
              <Card className="p-6 space-y-6">
                <AddressSelector
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                />
                <Separator />
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" disabled>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => setCurrentStep(1)}
                    disabled={!selectedAddressId}
                  >
                    Continue to Shipping
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 1 && (
              <Card className="p-6 space-y-6">
                <ShippingOptions
                  options={shippingOptions}
                  selectedOptionId={selectedShippingId}
                  onSelectOption={setSelectedShippingId}
                />
                <Separator />
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setCurrentStep(0)}>
                    Back
                  </Button>
                  <Button className="flex-1" onClick={() => setCurrentStep(2)}>
                    Continue to Payment
                  </Button>
                </div>
              </Card>
            )}

            {/* Step 3: Payment */}
            {currentStep === 2 && (
              <Card className="p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-6">Payment Details</h2>

                  <div className="space-y-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="4532 1234 5678 9010"
                        maxLength="19"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          maxLength="3"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <Separator />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={!paymentData.cardName || !paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv}
                  >
                    Place Order
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              shipping={shippingCost}
              tax={tax}
              checkoutText="Continue"
            />
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
