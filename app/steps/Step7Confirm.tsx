"use client";

import { CreditCard } from "lucide-react";
import type { BookingFormData, ServiceType, FrequencyType, HomeType, PetType } from "../hooks/useBookingForm";

const serviceNames: Record<ServiceType, string> = {
  standard: "Standard Cleaning",
  deep: "Deep Cleaning",
  move: "Move-in/Move-out",
  "post-construction": "Post-Construction",
};

const frequencyLabels: Record<FrequencyType, string> = {
  "one-time": "One-time",
  weekly: "Weekly",
  "bi-weekly": "Bi-weekly",
  monthly: "Monthly",
};

const homeTypeLabels: Record<HomeType, string> = {
  apartment: "Apartment",
  house: "House",
  condo: "Condo",
};

const addonLabels: Record<string, string> = {
  fridge: "Inside fridge",
  oven: "Inside oven",
  cabinets: "Inside cabinets",
  laundry: "Laundry",
  windows: "Interior windows",
  patio: "Patio/balcony",
};

interface Step7ConfirmProps {
  formData: BookingFormData;
  onChange: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
  onSubmit: () => void;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm py-1.5">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-900 font-medium">{value}</span>
    </div>
  );
}

export default function Step7Confirm({ formData, onChange, onSubmit }: Step7ConfirmProps) {
  const {
    service,
    beds,
    baths,
    sqft,
    homeType,
    frequency,
    addons,
    hasPets,
    petCount,
    petType,
    sheddingLevel,
    date,
    time,
    name,
    phone,
    email,
    address,
    city,
    zip,
  } = formData;

  const selectedAddons = Object.entries(addons)
    .filter(([, v]) => v)
    .map(([k]) => addonLabels[k] || k)
    .join(", ") || "None";

  const sheddingLabels = ["Light", "Moderate", "Heavy"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Review & confirm</h2>
        <p className="text-gray-600 mt-1">Double-check your details before booking.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-1">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
          Booking summary
        </h3>
        {service && <SummaryRow label="Service" value={serviceNames[service]} />}
        {homeType && (
          <SummaryRow label="Home" value={`${homeTypeLabels[homeType]} · ${beds} bed · ${baths} bath`} />
        )}
        {sqft && <SummaryRow label="Square footage" value={`${sqft} sq ft`} />}
        {frequency && <SummaryRow label="Frequency" value={frequencyLabels[frequency]} />}
        <SummaryRow label="Add-ons" value={selectedAddons} />
        <SummaryRow
          label="Pets"
          value={
            hasPets
              ? `${petCount} ${petType || "pet"}${sheddingLevel ? ` · ${sheddingLabels[sheddingLevel - 1]} shedding` : ""}`
              : "No pets"
          }
        />
        {date && time && <SummaryRow label="Date & Time" value={`${date} at ${time}`} />}
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Contact info
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="(555) 123-4567"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-900 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="jane@example.com"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Address
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            value={address}
            onChange={(e) => onChange("address", e.target.value)}
            placeholder="Street address"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={city}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder="City"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
            <input
              type="text"
              value={zip}
              onChange={(e) => onChange("zip", e.target.value)}
              placeholder="ZIP code"
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Payment method
        </h3>
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 flex flex-col items-center justify-center text-center gap-2">
          <CreditCard className="w-8 h-8 text-gray-400" />
          <p className="text-sm text-gray-500">Payment collection will be handled securely at checkout.</p>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="w-full rounded-xl bg-teal-600 text-white font-semibold text-base py-3.5 hover:bg-teal-700 active:bg-teal-800 transition-colors cursor-pointer"
      >
        Book Now
      </button>
    </div>
  );
}
