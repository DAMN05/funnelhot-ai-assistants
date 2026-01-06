"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Assistant, ChatMessage as ChatMessageType } from "@/types/assistant";
import { storageService } from "@/lib/storage";
import { getRandomChatResponse } from "@/data/chatResponses";
import { ChatMessage } from "@/components/assistants/ChatMessage";
import { ChatInput } from "@/components/assistants/ChatInput";
import { Button } from "@/components/ui/Button";


export default function TrainingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trainingRules, setTrainingRules] = useState("");
  const [isSavingRules, setIsSavingRules] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadedAssistant = storageService.getAssistantById(id);
    if (!loadedAssistant) {
      alert("Asistente no encontrado");
      router.push("/");
      return;
    }

    setAssistant(loadedAssistant);
    setTrainingRules(loadedAssistant.rules || "");

    const chatHistory = storageService.getChatHistory(id);
    setMessages(chatHistory);

    setIsLoading(false);
  }, [id, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSaveRules = () => {
    if (!assistant) return;

    setIsSavingRules(true);
    setTimeout(() => {
      const success = storageService.saveTrainingRules(id, trainingRules);
      if (success) {
        alert("Entrenamiento guardado exitosamente");
        setAssistant({ ...assistant, rules: trainingRules });
      } else {
        alert("Error al guardar el entrenamiento");
      }
      setIsSavingRules(false);
    }, 500);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    storageService.saveChatHistory(id, newMessages);

    setIsTyping(true);
    setTimeout(() => {
      const assistantMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getRandomChatResponse(),
        timestamp: new Date(),
      };

      const updatedMessages = [...newMessages, assistantMessage];
      setMessages(updatedMessages);
      storageService.saveChatHistory(id, updatedMessages);
      setIsTyping(false);
    }, 1500);
  };

  const handleResetChat = () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas reiniciar la conversación?"
    );
    if (confirmed) {
      setMessages([]);
      storageService.clearChatHistory(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!assistant) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="mb-4"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Volver
          </Button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {assistant.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Idioma: {assistant.language}</span>
              <span>•</span>
              <span>Tono: {assistant.tone}</span>
              <span>•</span>
              <span>
                Audio: {assistant.audioEnabled ? "Habilitado" : "Deshabilitado"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Entrenamiento
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Define las reglas y el comportamiento de tu asistente
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Instrucciones / Prompts
                </label>
                <textarea
                  value={trainingRules}
                  onChange={(e) => setTrainingRules(e.target.value)}
                  placeholder="Ej: Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 font-medium placeholder:text-gray-400"
                />
              </div>

              <Button
                onClick={handleSaveRules}
                isLoading={isSavingRules}
                size="lg"
                className="w-full text-black font-semibold shadow-md hover:shadow-lg [&>svg]:text-blue"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16v5H7v-5M7 16l5-5 5 5M12 3v8"
                  />
                </svg>
                Guardar Entrenamiento
              </Button>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[600px]">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Chat Simulado
                </h2>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleResetChat}
                  disabled={messages.length === 0}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Reiniciar
                </Button>
              </div>
            </div>

           
            <div className="flex-1 overflow-y-auto p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <svg
                      className="w-16 h-16 mx-auto text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p className="text-gray-500">
                      Inicia una conversación con tu asistente
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="flex gap-3 max-w-[80%]">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                          <svg
                            className="w-5 h-5"
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
                        </div>
                        <div className="bg-gray-100 rounded-lg px-4 py-2">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            <span
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></span>
                            <span
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </>
              )}
            </div>

            
            <div className="p-6 border-t border-gray-200">
              <ChatInput onSend={handleSendMessage} disabled={isTyping} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}