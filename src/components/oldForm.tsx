"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { Check } from "lucide-react";
import { truncate } from "fs";

interface FormData {
  street: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export function OldForm() {
  const [formData, setFormData] = useState<FormData>({
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState({
    message: "",
    success: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setServerResponse({ ...serverResponse, message: "", success: false });
    try {
      // Simulate form submission with potential for error
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve(true);
          } else {
            reject(new Error("Authentication failed. Please try again."));
          }
        }, 1000);
      });
      setServerResponse({
        ...serverResponse,
        message: "Address saved successfully!",
        success: true,
      });
      setFormData({
        ...formData,
        street: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      });
    } catch (err) {
      setServerResponse({
        ...serverResponse,
        message: "An unexpected error occurred",
        success: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>
          Address Information
          <span className="text-red-500"> Without React 19</span>
        </CardTitle>
        <CardDescription>
          Please enter your shipping address details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                placeholder="123 Main St"
                required
                minLength={5}
                maxLength={100}
                autoComplete="street-address"
                aria-describedby="streetAddress-error"
                value={formData.street}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                placeholder="Apt 4B"
                maxLength={20}
                autoComplete="address-line2"
                aria-describedby="apartment-error"
                value={formData.apartment}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  required
                  minLength={2}
                  maxLength={50}
                  autoComplete="address-level2"
                  aria-describedby="city-error"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="NY"
                  required
                  minLength={2}
                  maxLength={50}
                  autoComplete="address-level1"
                  aria-describedby="state-error"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="10001"
                  required
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  maxLength={10}
                  autoComplete="postal-code"
                  aria-describedby="zipCode-error"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="United States"
                  required
                  minLength={2}
                  maxLength={56}
                  autoComplete="country-name"
                  aria-describedby="country-error"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {serverResponse?.message && (
            <Alert variant={serverResponse.success ? "default" : "destructive"}>
              {serverResponse.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{serverResponse.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
