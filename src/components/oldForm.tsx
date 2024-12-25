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
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

const zipCodePattern = /^[0-9]{5}(-[0-9]{4})?$/;
const addressSchema = z.object({
  street: z.string().min(5, "Street address should be minimum 5 characters"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().regex(zipCodePattern, {
    message:
      "Invalid ZIP code format. It should be in the form '12345' or '12345-6789'.",
  }),
  country: z.string().min(1, "Country is required"),
});

type FormData = z.infer<typeof addressSchema>;

export function OldForm() {
  const [errors, setErrors] = useState<Partial<FormData>>({});
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

  const validateForm = (): boolean => {
    const result = addressSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<FormData> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path) {
          fieldErrors[issue.path[0] as keyof FormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop here if validation fails
    }
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
                autoComplete="street-address"
                aria-describedby="streetAddress-error"
                value={formData.street}
                onChange={handleChange}
                className={errors?.street ? "border-red-500" : ""}
              />
              {errors?.street && (
                <p id="street-error" className="text-sm text-red-500">
                  {errors.street}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                placeholder="Apt 4B"
                autoComplete="address-line2"
                aria-describedby="apartment-error"
                value={formData.apartment}
                onChange={handleChange}
                className={errors?.apartment ? "border-red-500" : ""}
              />

              {errors?.apartment && (
                <p id="apartment-error" className="text-sm text-red-500">
                  {errors.apartment}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="New York"
                  autoComplete="address-level2"
                  aria-describedby="city-error"
                  value={formData.city}
                  onChange={handleChange}
                  className={errors?.city ? "border-red-500" : ""}
                />
                {errors?.city && (
                  <p id="city-error" className="text-sm text-red-500">
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="NY"
                  autoComplete="address-level1"
                  aria-describedby="state-error"
                  value={formData.state}
                  onChange={handleChange}
                  className={errors?.state ? "border-red-500" : ""}
                />
                {errors?.state && (
                  <p id="state-error" className="text-sm text-red-500">
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  name="zipCode"
                  placeholder="10001"
                  autoComplete="postal-code"
                  aria-describedby="zipCode-error"
                  value={formData.zipCode}
                  onChange={handleChange}
                  className={errors?.zipCode ? "border-red-500" : ""}
                />
                {errors?.zipCode && (
                  <p id="zipCode-error" className="text-sm text-red-500">
                    {errors.zipCode}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="United States"
                  autoComplete="country-name"
                  aria-describedby="country-error"
                  value={formData.country}
                  onChange={handleChange}
                  className={errors?.country ? "border-red-500" : ""}
                />
                {errors?.country && (
                  <p id="country-error" className="text-sm text-red-500">
                    {errors.country}
                  </p>
                )}
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
