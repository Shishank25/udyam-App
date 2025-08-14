"use client"

import { useState } from "react";
import DynamicForm from "@/components/DynamicForm";
export default function Home() {

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <main className="flex flex-col items-center space-y-6">
      <div className="flex flex-col items-center mt-4">
        <h1 className="font-semibold text-2xl text-center">
          UDYAM REGISTRATION FORM
        </h1>
        <p className="font-xl text-center">
          For New Enterprise who are not Registered yet as MSME
        </p>
      </div>
      <DynamicForm currentStep={currentStep} setCurrentStep={setCurrentStep}/>
    </main>
  );
}
