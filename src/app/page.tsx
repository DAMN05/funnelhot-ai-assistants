"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Assistant } from "@/types/assistant";
import { storageService } from "@/lib/storage";
import { AssistantCard } from "@/components/assistants/AssistantCard";
import { EmptyState } from "@/components/assistants/EmptyState";
import { AssistantModal } from "@/components/assistants/AssistantModal";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(
    null
  );

  const loadAssistants = () => {
    const loadedAssistants = storageService.getAssistants();
    setAssistants(loadedAssistants);
  };

  useEffect(() => {
    storageService.InicioDataEjemplo();
    loadAssistants();
    setIsLoading(false);
  }, []);

  const handleCreateAssistant = () => {
    setSelectedAssistant(null);
    setIsModalOpen(true);
  };

  const handleEditAssistant = (assistant: Assistant) => {
    setSelectedAssistant(assistant);
    setIsModalOpen(true);
  };

  const handleDeleteAssistant = (id: string) => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este asistente?"
    );

    if (confirmed) {
      const success = storageService.deleteAssistant(id);
      if (success) {
        loadAssistants();
        alert("Asistente eliminado exitosamente");
      }
    }
  };

  const handleTrainAssistant = (id: string) => {
    router.push(`/${id}`);
  };

  const handleModalSuccess = () => {
    loadAssistants();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Asistentes IA
          </h1>
          <p className="text-gray-600">
            Administra y configura tus asistentes de inteligencia artificial
          </p>
        </div>

        {/* Contenido principal */}
        {assistants.length === 0 ? (
          <EmptyState onCreateClick={handleCreateAssistant} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {assistants.length}{" "}
                {assistants.length === 1 ? "asistente" : "asistentes"}
              </p>
              <Button onClick={handleCreateAssistant}>
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
                Crear Asistente
              </Button>
            </div>

            {/* Lista de tarjetas */}
            <div className="space-y-4">
              {assistants.map((assistant) => (
                <AssistantCard
                  key={assistant.id}
                  assistant={assistant}
                  onEdit={handleEditAssistant}
                  onDelete={handleDeleteAssistant}
                  onTrain={handleTrainAssistant}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal */}
      <AssistantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        assistant={selectedAssistant}
      />
    </main>
  );
}