"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import {AssistantModalStep1 } from "./Modal1";
import { AssistantModalStep2} from "./Modal2";
import { Assistant, AssistantFormData } from "@/types/assistant";
import { storageService } from "@/lib/storage";

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  assistant?: Assistant | null;
}

const initialFormData: AssistantFormData = {
  name: "",
  language: "",
  tone: "",
  responseLength: {
    short: 30,
    medium: 50,
    long: 20,
  },
  audioEnabled: false,
};

export const AssistantModal: React.FC<AssistantModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  assistant,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AssistantFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (assistant) {
      setFormData({
        name: assistant.name,
        language: assistant.language,
        tone: assistant.tone,
        responseLength: assistant.responseLength,
        audioEnabled: assistant.audioEnabled,
      });
    } else {
      setFormData(initialFormData);
    }
    setStep(1);
    setErrors({});
  }, [assistant, isOpen]);

  const handleChange = (
    field: keyof AssistantFormData,
    value: AssistantFormData[keyof AssistantFormData]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof AssistantFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "El nombre debe tener al menos 3 caracteres";
    }

    if (!formData.language) {
      newErrors.language = "El idioma es requerido";
    }

    if (!formData.tone) {
      newErrors.tone = "El tono es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<string, string>> = {};
    const total =
      formData.responseLength.short +
      formData.responseLength.medium +
      formData.responseLength.long;

    if (total !== 100) {
      newErrors.responseLength = "La suma de los porcentajes debe ser 100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    } else {
      alert("Por favor completa todos los campos requeridos correctamente");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    if (!validateStep2()) {
      alert("La suma de los porcentajes debe ser exactamente 100%");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      try {
        if (assistant) {
          storageService.updateAssistant(assistant.id, {
            name: formData.name,
            language: formData.language as Assistant["language"],
            tone: formData.tone as Assistant["tone"],
            responseLength: formData.responseLength,
            audioEnabled: formData.audioEnabled,
          });
          alert("Asistente actualizado exitosamente");
        } else {
          storageService.createAssistant({
            name: formData.name,
            language: formData.language as Assistant["language"],
            tone: formData.tone as Assistant["tone"],
            responseLength: formData.responseLength,
            audioEnabled: formData.audioEnabled,
          });
          alert("Asistente creado exitosamente");
        }

        setIsLoading(false);
        onSuccess();
        onClose();
      } catch (error) {
        console.error("Error al guardar el asistente:", error);
        alert("Ocurrió un error al guardar el asistente");
        setIsLoading(false);
      }
    }, 500);
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={assistant ? "Editar Asistente" : "Crear Nuevo Asistente"}
    >
      {step === 1 ? (
        <AssistantModalStep1
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onNext={handleNext}
          onCancel={handleClose}
        />
      ) : (
        <AssistantModalStep2
          formData={formData}
          errors={errors}
          onChange={handleChange}
          onBack={handleBack}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      )}
    </Modal>
  );
};