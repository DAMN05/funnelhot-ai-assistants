"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { AssistantFormData, LANGUAGE_OPTIONS, TONE_OPTIONS } from "@/types/assistant";

interface AssistantModalStep1Props {
  formData: AssistantFormData;
  errors: Partial<Record<keyof AssistantFormData, string>>;
  onChange: (field: keyof AssistantFormData, value: string) => void;
  onNext: () => void;
  onCancel: () => void;
}

export const AssistantModalStep1: React.FC<AssistantModalStep1Props> = ({
  formData,
  errors,
  onChange,
  onNext,
  onCancel,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Indicador de pasos */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-semibold">
            1
          </div>
          <div className="w-16 h-1 bg-gray-300 mx-2"></div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold">
            2
          </div>
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Datos Básicos</h3>
        <p className="text-sm text-gray-600 mt-1">
          Configura la información principal de tu asistente
        </p>
      </div>

      {/* Nombre */}
      <Input
        label="Nombre del Asistente"
        type="text"
        value={formData.name}
        onChange={(e) => onChange("name", e.target.value)}
        error={errors.name}
        placeholder="Ej: Asistente de Ventas"
        required
      />

      {/* Idioma */}
      <Select
        label="Idioma"
        value={formData.language}
        onChange={(e) => onChange("language", e.target.value)}
        options={LANGUAGE_OPTIONS}
        error={errors.language}
        required
      />

      {/* Tono */}
      <Select
        label="Tono/Personalidad"
        value={formData.tone}
        onChange={(e) => onChange("tone", e.target.value)}
        options={TONE_OPTIONS}
        error={errors.tone}
        required
      />

      {/* Botones */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Siguiente
        </Button>
      </div>
    </form>
  );
};