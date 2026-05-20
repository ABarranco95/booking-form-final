"use client";

import type { FrequencyType, BookingFormData } from "../hooks/useBookingForm";

const frequencies: {
  id: FrequencyType;
  label: string;
  description: string;
  discount?: string;
}[] = [
  {
    id: "one-time",
    label: "One-time",
    description: "A single cleaning appointment",
  },
  {
    id: "weekly",
    label: "Weekly",
    description: "Fresh home every week",
    discount: "save 15%",
  },
  {
    id: "bi-weekly",
    label: "Bi-weekly",
    description: "Clean home every two weeks",
    discount: "save 10%",
  },
  {
    id: "monthly",
    label: "Monthly",
    description: "Monthly refresh for your home",
    discount: "save 5%",
  },
];

interface Step3FrequencyProps {
  value: FrequencyType | null;
  onChange: (frequency: FrequencyType) => void;
}

export default function Step3Frequency({ value, onChange }: Step3FrequencyProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">How often?</h2>
        <p className="text-gray-600 mt-1">Choose a schedule that works for you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {frequencies.map((freq) => {
          const selected = value === freq.id;
          return (
            <button
              key={freq.id}
              onClick={() => onChange(freq.id)}
              className={`relative text-left rounded-2xl border p-5 transition-all cursor-pointer ${
                selected
                  ? "border-teal-600 bg-teal-50/40 shadow-sm ring-1 ring-teal-600"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {freq.discount && (
                <span className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-700">
                  {freq.discount}
                </span>
              )}
              <h3 className="text-base font-semibold text-gray-900">
                {freq.label}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{freq.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
