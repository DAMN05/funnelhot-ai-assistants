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
      Español: "🇪🇸",
      Inglés: "🇺🇸",
      Portugués: "🇧🇷",
    };
    return flags[language] || "🌐";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 animate-fade-in">
      <div className="flex items-center justify-between gap-6">
        {/* Información del asistente */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {assistant.name}
          </h3>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Idioma */}
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-lg">{getLanguageFlag(assistant.language)}</span>
              <span className="font-medium">Idioma:</span>
              <span>{assistant.language}</span>
            </div>

            {/* Tono */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">Tono:</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getToneColor(
                  assistant.tone
                )}`}
              >
                {assistant.tone}
              </span>
            </div>

            {/* Audio */}
            {assistant.audioEnabled && (
              <div className="flex items-center gap-2 text-emerald-600">
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
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span className="text-sm font-medium">Audio habilitado</span>
              </div>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(assistant)}
            className="flex items-center gap-2"
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
            Editar
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(assistant.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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
            Eliminar
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => onTrain(assistant.id)}
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
            Entrenar
          </Button>
        </div>
      </div>
    </div>
  );
};