"use client";

import { useMemo } from "react";
import { Minus, Plus } from "lucide-react";
import type { PetType, BookingFormData } from "../hooks/useBookingForm";

const petTypes: { id: PetType; label: string }[] = [
  { id: "dog", label: "Dog" },
  { id: "cat", label: "Cat" },
  { id: "other", label: "Other" },
];

const sheddingLabels = ["Light", "Moderate", "Heavy"];

interface Step5PetsProps {
  hasPets: boolean;
  petCount: number;
  petType: PetType | null;
  sheddingLevel: number;
  onChange: <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => void;
}

export default function Step5Pets({
  hasPets,
  petCount,
  petType,
  sheddingLevel,
  onChange,
}: Step5PetsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Do you have pets?</h2>
        <p className="text-gray-600 mt-1">This helps us assign the right team and supplies.</p>
      </div>

      <div className="flex gap-3">
        {[
          { label: "No pets", value: false },
          { label: "I have pets", value: true },
        ].map((option) => {
          const selected = hasPets === option.value;
          return (
            <button
              key={option.label}
              onClick={() => onChange("hasPets", option.value)}
              className={`flex-1 text-center rounded-2xl border p-4 transition-all cursor-pointer ${
                selected
                  ? "border-teal-600 bg-teal-50/40 ring-1 ring-teal-600"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-sm font-semibold text-gray-900">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>

      {hasPets && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Pet type
            </label>
            <div className="flex gap-3">
              {petTypes.map((type) => {
                const selected = petType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => onChange("petType", type.id)}
                    className={`flex-1 text-center rounded-xl border py-2.5 text-sm font-medium transition-all cursor-pointer ${
                      selected
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Number of pets
            </label>
            <div className="inline-flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-2">
              <button
                onClick={() => onChange("petCount", Math.max(1, petCount - 1))}
                disabled={petCount <= 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-gray-900">
                {petCount}
              </span>
              <button
                onClick={() => onChange("petCount", Math.min(10, petCount + 1))}
                disabled={petCount >= 10}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Shedding level
            </label>
            <div className="flex gap-2">
              {[1, 2, 3].map((level) => {
                const selected = sheddingLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => onChange("sheddingLevel", level)}
                    className={`flex-1 text-center rounded-xl border py-2.5 text-sm font-medium transition-all cursor-pointer ${
                      selected
                        ? "border-teal-600 bg-teal-50 text-teal-700"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {sheddingLabels[level - 1]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
