"use client";

import type { ServiceType, BookingFormData } from "../hooks/useBookingForm";

const services: {
  id: ServiceType;
  emoji: string;
  title: string;
  description: string;
  price: number;
  popular?: boolean;
}[] = [
  {
    id: "standard",
    emoji: "🧹",
    title: "Standard Cleaning",
    description: "Regular upkeep for a consistently tidy home.",
    price: 120,
  },
  {
    id: "deep",
    emoji: "🧽",
    title: "Deep Cleaning",
    description: "A thorough top-to-bottom clean for every surface.",
    price: 200,
    popular: true,
  },
  {
    id: "move",
    emoji: "🏠",
    title: "Move-in/Move-out",
    description: "Get your old or new home spotless for the transition.",
    price: 250,
  },
  {
    id: "post-construction",
    emoji: "🪟",
    title: "Post-Construction",
    description: "Remove dust and debris after renovation work.",
    price: 300,
  },
];

interface Step1ServiceProps {
  value: BookingFormData["service"];
  onChange: (service: ServiceType) => void;
}

export default function Step1Service({ value, onChange }: Step1ServiceProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Choose your service</h2>
        <p className="text-gray-600 mt-1">Select the cleaning service that fits your needs.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => {
          const selected = value === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onChange(service.id)}
              className={`relative text-left rounded-2xl border p-5 transition-all cursor-pointer ${
                selected
                  ? "border-teal-600 bg-teal-50/40 shadow-sm ring-1 ring-teal-600"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {service.popular && (
                <span className="absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-600 text-white">
                  POPULAR
                </span>
              )}
              <div className="text-3xl mb-3">{service.emoji}</div>
              <h3 className="text-base font-semibold text-gray-900">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              <p className="text-sm font-semibold text-teal-700 mt-3">
                From ${service.price}
              </p>
            </button>
          );
        })}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start">
        <span className="text-lg shrink-0">💡</span>
        <p className="text-sm text-amber-800 leading-relaxed">
          <span className="font-semibold">First time booking?</span> We recommend
          starting with a Deep Clean so our team can get your home to baseline.
        </p>
      </div>
    </div>
  );
}
