import { Assistant } from "@/types/assistant";

const STORAGE_KEY = "ai-assistants";

export const storageService = {
    //Obtenemos todos los asistentes almacenados
    getAssistants: (): Assistant[] => {
        if (typeof window === "undefined") return [];
        
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];

        try {
            return JSON.parse(data);

        }catch(error){
            console.error("Error al analizar los asistentes del localStorage:", error);
            return [];
        }
    },

    saveAssistants: (assistants: Assistant[]): void => {
        if (typeof window === "undefined") return;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(assistants));
        } catch (error){
            console.error("Error al guardar los asistentes en el localStorage:", error);
        }
    },

    getAssistantById: (id:string):Assistant | undefined =>{
        const assistants = storageService.getAssistants();
        return assistants.find((assistant)=> assistant.id === id);
    },

    createAssistant:(assistant: Omit<Assistant, "id">):Assistant =>{
        const assistants = storageService.getAssistants();
        const newAssistant: Assistant = {
            ...assistant,
            id: Date.now().toString(),
        };
        assistants.push(newAssistant);
        storageService.saveAssistants(assistants);
        return newAssistant;
    },

    updateAssistant: (id:string, updates: Partial<Assistant>): boolean =>{
        const assistants = storageService.getAssistants();
        const index = assistants.findIndex((a)=>a.id ===id);

        if (index === -1) return false;

        assistants[index] = {...assistants[index], ...updates};
        storageService.saveAssistants(assistants);
        return true;
    },

    deleteAssistant: ( id:string) : boolean =>{
        const assistants = storageService.getAssistants();
        const filtered =assistants.filter((a)=> a.id !== id);

        if (filtered.length === assistants.length) return false;

        storageService.saveAssistants ( filtered);
        return true
    },

    InicioDataEjemplo: ():void =>{
        const exist = storageService.getAssistants();
        if (exist.length > 0 )return ;

        const DataEj : Assistant[] = [
            {
                id: "1",
                name: "Asistente de Ventas",
                language: "Español",
                tone: "Profesional",
                responseLength: {
                    short : 30 ,
                    medium: 50,
                    long: 20,
                },
                audioEnabled: true,
                rules: "Eres un asistente especializado en ventas. Siempre sé cordial y enfócate en identificar necesidades del cliente antes de ofrecer productos." 
            },
            {
                id : "2",
                name : "Soporte Técnico",
                language :"Ingles",
                tone:"Amigable",
                responseLength:{
                    short: 20,
                    medium: 30,
                    long: 50,
                },
                audioEnabled: false,
                rules: " Ayudas a resolver problemas tecnicos de manera clara y paso a paso. Siempre confirma que el usuario haya entendido antes de continuar"

            },
        ];

        storageService.saveAssistants(DataEj);
    },
};