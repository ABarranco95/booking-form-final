"use client";

import { Check } from "lucide-react";

const steps = [
  "Service",
  "Home",
  "Frequency",
  "Add-ons",
  "Pets",
  "Date & Time",
  "Confirm",
];

interface SidebarProps {
  currentStep: number;
  goToStep: (step: number) => void;
}

export default function Sidebar({ currentStep, goToStep }: SidebarProps) {
  return (
    <aside className="hidden lg:block w-[280px] shrink-0">
      <div className="sticky top-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 px-2">
          Booking steps
        </h2>
        <nav className="space-y-1">
          {steps.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isCurrent = stepNum === currentStep;
            const isFuture = stepNum > currentStep;

            return (
              <button
                key={label}
                onClick={() => goToStep(stepNum)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                  isCurrent
                    ? "bg-teal-50 border border-teal-600 text-teal-600"
                    : "border border-transparent text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-semibold ${
                    isCompleted
                      ? "bg-teal-600 text-white"
                      : isCurrent
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    stepNum
                  )}
                </span>
                <span
                  className={`text-sm font-medium ${
                    isCurrent ? "text-teal-700" : ""
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
