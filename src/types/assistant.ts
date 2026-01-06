export interface Assistant {
    id: string;
    name: string;
    language: "Español"|"Inglés"|"Portugués";
    tone: "Formal" | "Casual" | "Profesional" | "Amigable" | "Amigable";
    responseLength: {
        short: number;
        medium: number;
        long: number;
    };
    audioEnabled: boolean;
    rules?:string;
}

export interface AssistantFormData{
    name: string;
    language: string;
    tone: string;
    responseLength: {
        short: number;
        medium: number;
        long: number;
    };
    audioEnabled: boolean;
}

export const LANGUAGE_OPTIONS =[
    {value: "Español", label: "Español Es"},
    {value: "Inglés", label: "Inglés Us"},
    {value: "Portugués", label: "Portugués Pt"},
];

export const TONE_OPTIONS = [
    {value: "Formal", label: "Formal"},
    {value: "Casual", label: "Casual"},
    {value: "Profesional", label: "Profesional"},
    {value: "Amigable", label: "Amigable"},
];

export interface ChatMessage {
    id: string;
    role : "user" | "assistant";
    content: string;
    timestamp: Date;
}

export interface TrainingData {
    assistantId: string;
    rules : string;
    chatHistory: ChatMessage[];
}