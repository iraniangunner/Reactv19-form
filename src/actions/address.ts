"use server";
import { z } from "zod";
import type { ActionResponse, AddressFormData } from "../types/address";

const addressSchema = z.object({
  street: z.string().min(5, "Street address should be minimum 5 characters"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(1, "Country is required"),
});

export async function submitAddress(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const rawData: AddressFormData = {
    street: formData.get("street") as string,
    apartment: formData.get("apartment") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zipCode: formData.get("zipCode") as string,
    country: formData.get("country") as string,
  };

  // Validate the form data
  const validatedData = addressSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      message: "Please fix the errors in the form",
      errors: validatedData.error.flatten().fieldErrors,
      inputs: rawData,
    };
  }

  // Here you would typically save the address to your database
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(true);
        } else {
          reject(new Error("Authentication failed. Please try again."));
        }
      }, 1000);
    });

    return {
      success: true,
      message: "Address saved successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
      inputs: rawData,
    };
  }
}
