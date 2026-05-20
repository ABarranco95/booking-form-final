"use client";

import { Minus, Plus } from "lucide-react";
import type { HomeType, BookingFormData } from "../hooks/useBookingForm";

const homeTypes: { id: HomeType; label: string; description: string }[] = [
  { id: "apartment", label: "Apartment", description: "Unit in a multi-family building" },
  { id: "house", label: "House", description: "Standalone residential home" },
  { id: "condo", label: "Condo", description: "Owned unit in a shared building" },
];

interface Step2HomeProps {
  beds: number;
  baths: number;
  sqft: string;
  homeType: HomeType | null;
  onChange: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
}

function Counter({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
      <span className="text-sm font-medium text-gray-900">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-6 text-center text-sm font-semibold text-gray-900">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Step2Home({ beds, baths, sqft, homeType, onChange }: Step2HomeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Tell us about your home</h2>
        <p className="text-gray-600 mt-1">Help us prepare the right team and time estimate.</p>
      </div>

      <div className="space-y-3">
        <Counter label="Bedrooms" value={beds} onChange={(v) => onChange("beds", v)} />
        <Counter label="Bathrooms" value={baths} onChange={(v) => onChange("baths", v)} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          Square footage
        </label>
        <input
          type="number"
          min={0}
          value={sqft}
          onChange={(e) => onChange("sqft", e.target.value)}
          placeholder="e.g. 1200"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Home type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {homeTypes.map((type) => {
            const selected = homeType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => onChange("homeType", type.id)}
                className={`text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                  selected
                    ? "border-teal-600 bg-teal-50/40 ring-1 ring-teal-600"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <h4 className="text-sm font-semibold text-gray-900">{type.label}</h4>
                <p className="text-xs text-gray-500 mt-1">{type.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
