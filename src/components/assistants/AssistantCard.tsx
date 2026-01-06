"use client";

import React from "react";
import { Assistant } from "@/types/assistant";
import { Button } from "@/components/ui/Button";

interface AssistantCardProps {
  assistant: Assistant;
  onEdit: (assistant: Assistant) => void;
  onDelete: (id: string) => void;
  onTrain: (id: string) => void;
}

export const AssistantCard: React.FC<AssistantCardProps> = ({
  assistant,
  onEdit,
  onDelete,
  onTrain,
}) => {
  const getToneColor = (tone: string) => {
    const colors: Record<string, string> = {
      Formal: "bg-blue-100 text-blue-800",
      Casual: "bg-green-100 text-green-800",
      Profesional: "bg-purple-100 text-purple-800",
      Amigable: "bg-yellow-100 text-yellow-800",
    };
    return colors[tone] || "bg-gray-100 text-gray-800";
  };

  const getLanguageFlag = (language: string) => {
    const flags: Record<string, string> = {
      Español: "ES",
      Inglés: "US",
      Portugués: "PT",
    };
    return flags[language] || "🌐";
  };

  return (
    <div className="rounded-xl border border-primary-800 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-primary-500 transition duration-200 animate-fade-in p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-6">
        <div className="flex-1 min-w-0 order-1 lg:order-none">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 break-words">
            {assistant.name}
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-gray-700 flex-wrap">
              <span className="font-medium">Idioma:</span>
              <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-800 border border-primary-200 px-2.5 py-1 rounded-full font-semibold text-xs shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {getLanguageFlag(assistant.language)}
              </span>
              <span className="text-gray-700 font-medium">{assistant.language}</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-700">Tono:</span>
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${getToneColor(
                  assistant.tone
                )}`}
              >
                {assistant.tone}
              </span>
            </div>

            {assistant.audioEnabled && (
              <div className="flex items-center gap-2 text-emerald-600 flex-wrap">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Audio habilitado</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto order-2 lg:order-none">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(assistant)}
            className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2"
            title="Editar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span className="hidden sm:inline">Editar</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(assistant.id)}
            className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Eliminar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span className="hidden sm:inline">Eliminar</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onTrain(assistant.id)}
            className="flex-1 sm:flex-none"
            title="Entrenar"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <span className="hidden sm:inline">Entrenar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};