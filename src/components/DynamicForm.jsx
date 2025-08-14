// components/DynamicForm.js
"use client";

import { useState } from "react";
import formSchema from "@/lib/formSchema";

export default function DynamicForm({currentStep, setCurrentStep}) {
  
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const stepFields = formSchema.filter(f => f.step === currentStep);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validateField = (field, value) => {
    if (field.required && !value) return "This field is required.";
    if (field.pattern && value && !new RegExp(field.pattern).test(value))
      return "Invalid format.";
    if (field.maxlength && value && value.length > field.maxlength)
      return `Maximum length is ${field.maxlength} characters.`;
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep === 3) {
      window.location.reload();
      return;
    }
    const newErrors = {};
    stepFields.forEach(field => {
      if (field.type !== "submit") {
        const err = validateField(field, formData[field.name]);
        if (err) newErrors[field.name] = err;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (currentStep === 1) {
        setCurrentStep(2); // Move to Step 2
      } else {
        try {
          const pack = {
                aadhaarName: formData.aadhaarName,
                aadhaarNumber: formData.aadhaarNumber,
                panName: formData.panName,
                panNumber: formData.panNumber,
                orgType: formData.orgType,
                dobAsPerPan: formData.dobAsPerPan
              };
          console.log(pack);
          const res = await fetch("https://udyam-backend-production-0ab4.up.railway.app/submit-form", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pack)
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error);
          setCurrentStep(3);
        } catch (err) {
          console.log(err);
          alert("Error: " + err.message);
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 md:p-12 md:border border-gray-400 rounded-[1.5rem] shadow space-y-6">
      <div className="w-full rounded-full border border-blue-500 h-4 overflow-hidden">
        <div className={`${currentStep === 1 ? 'w-0' : currentStep === 2 ? 'w-1/2' : 'w-full'} bg-blue-500 h-4 duration-1000 transition-all`}/>
      </div>
      <h2 className="text-xl font-bold mb-4">Step {currentStep === 1? '1' : '2'} / 2</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {stepFields.map(field => {
          if (field.type === "text") {
            return (
              <div key={field.id}>
                <label htmlFor={field.id} className="block font-medium mb-1">{field.label}</label>
                <input
                  id={field.id}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder || ""}
                  maxLength={field.maxlength || undefined}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full border border-gray-300 px-4 py-2 rounded-full outline-none"
                  pattern={field.pattern || null}
                  required
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            );
          }

          if (field.type === "checkbox") {
            return (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  id={field.id}
                  name={field.name}
                  type="checkbox"
                  checked={!!formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.checked)}
                  required
                />
                <label htmlFor={field.id} className="text-justify">{field.label}</label>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            );
          }

          if (field.type === "select") {
            return (
              <div key={field.id}>
                <label htmlFor={field.id} className="block font-medium mb-1">{field.label}</label>
                <select
                  id={field.id}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full border border-gray-300 px-3 py-2 rounded-[1.5rem]"
                  required
                >
                  <option value="">Select an option</option>
                  {field.options?.map(opt => (
                    <option key={opt.value} value={opt.value} className="text-black">{opt.label}</option>
                  ))}
                </select>
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">{errors[field.name]}</p>
                )}
              </div>
            );
          }

          if (field.type === "submit") {
            return (
              <button
                key={field.id}
                type="submit"
                className="bg-[#0D5EA6] text-white px-4 py-2 rounded-full"
              >
                {field.label}
              </button>
            );
          }

          return null;
        })}
      </form>
    </div>
  );
}
