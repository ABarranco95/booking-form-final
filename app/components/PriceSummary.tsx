"use client";

import { useMemo } from "react";
import { Check, Shield, Calendar, RotateCcw } from "lucide-react";
import type { BookingFormData, ServiceType, FrequencyType } from "../hooks/useBookingForm";

const serviceBasePrices: Record<ServiceType, number> = {
  standard: 120,
  deep: 200,
  move: 250,
  "post-construction": 300,
};

const frequencyDiscounts: Record<FrequencyType, number> = {
  "one-time": 0,
  weekly: 0.15,
  "bi-weekly": 0.1,
  monthly: 0.05,
};

const addonPrices: Record<string, number> = {
  fridge: 25,
  oven: 25,
  cabinets: 35,
  laundry: 30,
  windows: 40,
  patio: 35,
};

interface PriceSummaryProps {
  formData: BookingFormData;
}

export default function PriceSummary({ formData }: PriceSummaryProps) {
  const { service, frequency, beds, baths, addons } = formData;

  const summary = useMemo(() => {
    let base = 0;
    if (service) {
      base = serviceBasePrices[service];
    }

    const bedBathExtra = Math.max(0, beds - 2) * 15 + Math.max(0, baths - 2) * 15;
    base += bedBathExtra;

    let addonsTotal = 0;
    Object.entries(addons).forEach(([key, selected]) => {
      if (selected) addonsTotal += addonPrices[key] || 0;
    });

    const subtotal = base + addonsTotal;
    const discountRate = frequency ? frequencyDiscounts[frequency] : 0;
    const discount = subtotal * discountRate;
    const total = Math.max(0, subtotal - discount);

    return {
      base,
      bedBathExtra,
      addonsTotal,
      subtotal,
      discount,
      total,
      discountRate,
    };
  }, [service, frequency, beds, baths, addons]);

  const hasSelections = service !== null;

  return (
    <aside className="w-full lg:w-[320px] shrink-0">
      <div className="lg:sticky lg:top-6 space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Price estimate
          </h3>

          {!hasSelections ? (
            <p className="text-sm text-gray-500">
              Select a service to see your estimated price.
            </p>
          ) : (
            <div className="space-y-3">
              {summary.base > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base price</span>
                  <span className="text-gray-900 font-medium">
                    ${summary.base.toFixed(0)}
                  </span>
                </div>
              )}
              {summary.bedBathExtra > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Extra rooms</span>
                  <span className="text-gray-900 font-medium">
                    +${summary.bedBathExtra.toFixed(0)}
                  </span>
                </div>
              )}
              {summary.addonsTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Add-ons</span>
                  <span className="text-gray-900 font-medium">
                    +${summary.addonsTotal.toFixed(0)}
                  </span>
                </div>
              )}
              {summary.discount > 0 && (
                <div className="flex justify-between text-sm text-teal-700">
                  <span className="font-medium">
                    Recurring discount ({Math.round(summary.discountRate * 100)}%)
                  </span>
                  <span className="font-medium">
                    -${summary.discount.toFixed(0)}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Estimated total
                </span>
                <span className="text-lg font-bold text-teal-700">
                  ${summary.total.toFixed(0)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="bg-teal-50 border border-teal-100 rounded-2xl p-5 space-y-3">
          <div className="flex items-start gap-2.5">
            <Calendar className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span className="text-sm text-teal-800 font-medium">
              Same-week availability
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <RotateCcw className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span className="text-sm text-teal-800 font-medium">
              Free cancellation
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <span className="text-sm text-teal-800 font-medium">
              Bonded & insured
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
