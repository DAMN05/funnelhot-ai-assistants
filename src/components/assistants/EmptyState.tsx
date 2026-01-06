import React from "react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onCreateClick: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No hay asistentes creados
        </h2>
        <p className="text-gray-600 mb-6">
          Comienza creando tu primer asistente de IA para automatizar
          interacciones con tus leads.
        </p>
        <Button onClick={onCreateClick} size="lg">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Crear Primer Asistente
        </Button>
      </div>
    </div>
  );
};