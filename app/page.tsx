"use client";

import { useBookingForm } from "./hooks/useBookingForm";
import Sidebar from "./components/Sidebar";
import MobileStepper from "./components/MobileStepper";
import PriceSummary from "./components/PriceSummary";
import Step1Service from "./steps/Step1Service";
import Step2Home from "./steps/Step2Home";
import Step3Frequency from "./steps/Step3Frequency";
import Step4Addons from "./steps/Step4Addons";
import Step5Pets from "./steps/Step5Pets";
import Step6DateTime from "./steps/Step6DateTime";
import Step7Confirm from "./steps/Step7Confirm";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function BookingPage() {
  const {
    currentStep,
    formData,
    updateField,
    toggleAddon,
    canProceed,
    nextStep,
    prevStep,
    goToStep,
  } = useBookingForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Service
            value={formData.service}
            onChange={(service) => updateField("service", service)}
          />
        );
      case 2:
        return (
          <Step2Home
            beds={formData.beds}
            baths={formData.baths}
            sqft={formData.sqft}
            homeType={formData.homeType}
            onChange={updateField}
          />
        );
      case 3:
        return (
          <Step3Frequency
            value={formData.frequency}
            onChange={(frequency) => updateField("frequency", frequency)}
          />
        );
      case 4:
        return (
          <Step4Addons addons={formData.addons} onToggle={toggleAddon} />
        );
      case 5:
        return (
          <Step5Pets
            hasPets={formData.hasPets}
            petCount={formData.petCount}
            petType={formData.petType}
            sheddingLevel={formData.sheddingLevel}
            onChange={updateField}
          />
        );
      case 6:
        return (
          <Step6DateTime
            date={formData.date}
            time={formData.time}
            onChange={(date, time) => {
              if (date !== undefined) updateField("date", date);
              if (time !== undefined) updateField("time", time);
            }}
          />
        );
      case 7:
        return (
          <Step7Confirm
            formData={formData}
            onChange={updateField}
            onSubmit={() => {
              alert("Booking submitted! (This is a demo.)");
            }}
          />
        );
      default:
        return null;
    }
  };

  const isLastStep = currentStep === 7;
  const canGoNext = canProceed();

  return (
    <div className="min-h-screen bg-white">
      <MobileStepper currentStep={currentStep} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex gap-8 items-start">
          <Sidebar currentStep={currentStep} goToStep={goToStep} />

          <main className="flex-1 min-w-0">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
                {renderStep()}
              </div>

              {!isLastStep && (
                <div className="flex items-center justify-between mt-6">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!canGoNext}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </main>

          <PriceSummary formData={formData} />
        </div>
      </div>
    </div>
  );
}
