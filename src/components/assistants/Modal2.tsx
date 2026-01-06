"use client";

import React from "react";
import { Slider } from "@/components/ui/Slider";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import { AssistantFormData } from "@/types/assistant";

interface AssistantModalStep2Props {
  formData: AssistantFormData;
  errors: Partial<Record<string, string>>;
  onChange: (
    field: keyof AssistantFormData,
    value: AssistantFormData[keyof AssistantFormData]
  ) => void;
  onBack: () => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export const AssistantModalStep2: React.FC<AssistantModalStep2Props> = ({
  formData,
  errors,
  onChange,
  onBack,
  onSubmit,
  isLoading = false,
}) => {
  const { short, medium, long } = formData.responseLength;
  const total = short + medium + long;

  const handleSliderChange = (
    type: "short" | "medium" | "long",
    value: number
  ) => {
    const newLength = { ...formData.responseLength, [type]: value };
    onChange("responseLength", newLength);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
            ✓
          </div>
          <div className="w-20 h-1 bg-blue-600 mx-2"></div>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
            2
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Configuración de Respuestas
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Define cómo responderá tu asistente
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-900 mb-3">
          Longitud de Respuestas{" "}
          <span className="text-red-500">*</span>
        </label>

        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <Slider
            label="Respuestas Cortas"
            value={short}
            onChange={(value) => handleSliderChange("short", value)}
          />

          <Slider
            label="Respuestas Medias"
            value={medium}
            onChange={(value) => handleSliderChange("medium", value)}
          />

          <Slider
            label="Respuestas Largas"
            value={long}
            onChange={(value) => handleSliderChange("long", value)}
          />

          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Total:
              </span>
              <span
                className={`text-lg font-bold ${
                  total === 100
                    ? "text-green-600"
                    : total > 100
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {total}%
              </span>
            </div>
            {total !== 100 && (
              <p className="text-xs text-red-600 mt-1">
                {total > 100
                  ? `La suma excede el 100% por ${total - 100}%`
                  : `Faltan ${100 - total}% para completar el 100%`}
              </p>
            )}
          </div>
        </div>

        {errors.responseLength && (
          <p className="text-sm text-red-600">{errors.responseLength}</p>
        )}
      </div>

      <div className="pt-4">
        <Checkbox
          id="audioEnabled"
          label="Habilitar respuestas de audio"
          checked={formData.audioEnabled}
          onChange={(e) => onChange("audioEnabled", e.target.checked)}
        />
        <p className="text-xs text-gray-500 mt-1 ml-6">
          El asistente podrá generar respuestas en formato de audio
        </p>
      </div>

      <div className="flex justify-between gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          Atrás
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          disabled={total !== 100}
        >
          Guardar Asistente
        </Button>
      </div>
    </form>
  );
};