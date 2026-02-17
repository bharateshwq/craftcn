'use client';

import { ReactNode, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useStore, Address } from '@/context/store-context';
import { cn } from '@/lib/utils';

interface AddressSelectorProps {
  selectedAddressId?: string;
  onSelectAddress: (addressId: string) => void;
  className?: string;
}

export function AddressSelector({ selectedAddressId, onSelectAddress, className }: AddressSelectorProps) {
  const { addresses } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-xl font-bold">Shipping Address</h2>

      <RadioGroup value={selectedAddressId} onValueChange={onSelectAddress}>
        <div className="space-y-3">
          {addresses.map((address) => (
            <div key={address.id} className="flex items-start space-x-3">
              <RadioGroupItem value={address.id} id={address.id} className="mt-3" />
              <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                <AddressCard address={address} />
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            + Add New Address
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Address</DialogTitle>
          </DialogHeader>
          <AddressForm
            onSuccess={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface AddressCardProps {
  address: Address;
}

function AddressCard({ address }: AddressCardProps) {
  return (
    <Card className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
      <p className="font-semibold mb-1">{address.name}</p>
      <p className="text-sm text-muted-foreground">
        {address.street}, {address.city}, {address.state} {address.zipCode}
      </p>
      <p className="text-sm text-muted-foreground">{address.country}</p>
      <p className="text-sm text-muted-foreground">{address.phone}</p>
    </Card>
  );
}

interface AddressFormProps {
  onSuccess?: () => void;
}

export function AddressForm({ onSuccess }: AddressFormProps) {
  const { addAddress } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddress: Address = {
      id: Date.now().toString(),
      ...formData,
    };
    addAddress(newAddress);
    setFormData({
      name: '',
      phone: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
    });
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+1 234 567 8900"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <input
          id="street"
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="123 Main Street"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="San Francisco"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="CA"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zipCode">Zip Code</Label>
          <input
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="94102"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
          </select>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Address
      </Button>
    </form>
  );
}
