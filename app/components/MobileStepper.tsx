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

interface MobileStepperProps {
  currentStep: number;
}

export default function MobileStepper({ currentStep }: MobileStepperProps) {
  return (
    <div className="lg:hidden w-full bg-white border-b border-gray-200 py-3 px-4 overflow-x-auto">
      <div className="flex items-center gap-2 min-w-max">
        {steps.map((label, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;
          const isFuture = stepNum > currentStep;

          return (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold shrink-0 ${
                    isCompleted || isCurrent
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" strokeWidth={3} />
                  ) : (
                    stepNum
                  )}
                </span>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    isCurrent
                      ? "text-teal-700"
                      : isCompleted
                      ? "text-gray-700"
                      : "text-gray-400"
                  }`}
                >
                  {label}
                </span>
              </div>
              {stepNum < steps.length && (
                <div
                  className={`w-4 h-px shrink-0 ${
                    isCompleted ? "bg-teal-600" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
