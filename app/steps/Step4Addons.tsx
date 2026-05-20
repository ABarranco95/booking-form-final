"use client";

import { Check } from "lucide-react";

const addonsList = [
  { id: "fridge", label: "Inside fridge", price: 25 },
  { id: "oven", label: "Inside oven", price: 25 },
  { id: "cabinets", label: "Inside cabinets", price: 35 },
  { id: "laundry", label: "Laundry", price: 30 },
  { id: "windows", label: "Interior windows", price: 40 },
  { id: "patio", label: "Patio/balcony", price: 35 },
];

interface Step4AddonsProps {
  addons: Record<string, boolean>;
  onToggle: (addon: string) => void;
}

export default function Step4Addons({ addons, onToggle }: Step4AddonsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Add-on services</h2>
        <p className="text-gray-600 mt-1">Customize your cleaning with extra tasks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addonsList.map((addon) => {
          const selected = addons[addon.id];
          return (
            <button
              key={addon.id}
              onClick={() => onToggle(addon.id)}
              className={`flex items-center justify-between rounded-xl border p-4 transition-all cursor-pointer text-left ${
                selected
                  ? "border-teal-600 bg-teal-50/40 ring-1 ring-teal-600"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex items-center justify-center w-5 h-5 rounded border ${
                    selected
                      ? "bg-teal-600 border-teal-600"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {addon.label}
                </span>
              </div>
              <span className="text-sm font-semibold text-teal-700">
                +${addon.price}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
