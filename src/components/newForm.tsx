"use client";
import { useActionState } from "react";
import { submitAddress } from "../actions/address";
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
import type { ActionResponse } from "../types/address";
import { CheckCircle2 } from "lucide-react";

const initialState: ActionResponse = {
  success: false,
  message: "",
};

export function NewForm() {
  const [state, action, isPending] = useActionState(
    submitAddress,
    initialState
  );

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>
          Address Information
          <span className="text-green-500"> With React 19</span>
        </CardTitle>
        <CardDescription>
          Please enter your shipping address details below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-6" autoComplete="on">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                name="street"
                placeholder="123 Main St"
                defaultValue={state.inputs?.street}
                required
                minLength={5}
                maxLength={100}
                autoComplete="street-address"
                aria-describedby="streetAddress-error"
                className={state?.errors?.street ? "border-red-500" : ""}
              />
              {state?.errors?.street && (
                <p id="streetAddress-error" className="text-sm text-red-500">
                  {state.errors.street[0]}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Apartment/Suite (Optional)</Label>
              <Input
                id="apartment"
                name="apartment"
                placeholder="Apt 4B"
                defaultValue={state.inputs?.apartment}
                maxLength={20}
                autoComplete="address-line2"
                aria-describedby="apartment-error"
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
                  defaultValue={state.inputs?.city}
                  minLength={2}
                  maxLength={50}
                  autoComplete="address-level2"
                  aria-describedby="city-error"
                  className={state?.errors?.city ? "border-red-500" : ""}
                />
                {state?.errors?.city && (
                  <p id="city-error" className="text-sm text-red-500">
                    {state.errors.city[0]}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="NY"
                  required
                  minLength={2}
                  defaultValue={state.inputs?.state}
                  maxLength={50}
                  autoComplete="address-level1"
                  aria-describedby="state-error"
                  className={state?.errors?.state ? "border-red-500" : ""}
                />
                {state?.errors?.state && (
                  <p id="state-error" className="text-sm text-red-500">
                    {state.errors.state[0]}
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
                  required
                  pattern="[0-9]{5}(-[0-9]{4})?"
                  maxLength={10}
                  defaultValue={state.inputs?.zipCode}
                  autoComplete="postal-code"
                  aria-describedby="zipCode-error"
                  className={state?.errors?.zipCode ? "border-red-500" : ""}
                />
                {state?.errors?.zipCode && (
                  <p id="zipCode-error" className="text-sm text-red-500">
                    {state.errors.zipCode[0]}
                  </p>
                )}
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
                  defaultValue={state.inputs?.country}
                  autoComplete="country-name"
                  aria-describedby="country-error"
                  className={state?.errors?.country ? "border-red-500" : ""}
                />
                {state?.errors?.country && (
                  <p id="country-error" className="text-sm text-red-500">
                    {state.errors.country[0]}
                  </p>
                )}
              </div>
            </div>
          </div>

          {state?.message && (
            <Alert variant={state.success ? "default" : "destructive"}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
