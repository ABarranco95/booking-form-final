"use client";

import { useState, useCallback } from "react";

export type ServiceType = "standard" | "deep" | "move" | "post-construction";
export type HomeType = "apartment" | "house" | "condo";
export type FrequencyType = "one-time" | "weekly" | "bi-weekly" | "monthly";
export type PetType = "dog" | "cat" | "other";

export interface BookingFormData {
  service: ServiceType | null;
  beds: number;
  baths: number;
  sqft: string;
  homeType: HomeType | null;
  frequency: FrequencyType | null;
  addons: Record<string, boolean>;
  hasPets: boolean;
  petCount: number;
  petType: PetType | null;
  sheddingLevel: number;
  date: string | null;
  time: string | null;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zip: string;
}

const initialFormData: BookingFormData = {
  service: null,
  beds: 2,
  baths: 2,
  sqft: "",
  homeType: null,
  frequency: null,
  addons: {
    fridge: false,
    oven: false,
    cabinets: false,
    laundry: false,
    windows: false,
    patio: false,
  },
  hasPets: false,
  petCount: 1,
  petType: null,
  sheddingLevel: 1,
  date: null,
  time: null,
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  zip: "",
};

const stepFields: Record<number, (keyof BookingFormData)[]> = {
  1: ["service"],
  2: ["beds", "baths", "sqft", "homeType"],
  3: ["frequency"],
  4: [],
  5: ["hasPets"],
  6: ["date", "time"],
  7: ["name", "phone", "email", "address", "city", "zip"],
};

export function useBookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);

  const updateField = useCallback(
    <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const toggleAddon = useCallback((addon: string) => {
    setFormData((prev) => ({
      ...prev,
      addons: { ...prev.addons, [addon]: !prev.addons[addon] },
    }));
  }, []);

  const canProceed = useCallback(() => {
    const fields = stepFields[currentStep];
    if (!fields) return true;
    return fields.every((field) => {
      const value = formData[field];
      if (value === null || value === undefined) return false;
      if (typeof value === "string" && value.trim() === "") return false;
      return true;
    });
  }, [currentStep, formData]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  return {
    currentStep,
    formData,
    updateField,
    toggleAddon,
    canProceed,
    nextStep,
    prevStep,
    goToStep,
  };
}
