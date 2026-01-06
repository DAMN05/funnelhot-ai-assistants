export const CHAT_RESPONSES = [
    "Entendido, ¿en qué más puedo ayudarte?",
    "Esa es una excelente pregunta.Déjame explicarte...",
    "Claro, con gusto te ayudo con eso.",
    "¿Podrías darme más detalles sobre tu consulta?",
    "Perfecto, he registrado esa información.",
    "Estoy aquí para ayudarte.¿Qué necesitas?",
    "Comprendo tu situacion .Veamos cómo podemos resolver esto",
    "Gracias por compartir esa información.",
];

export const getRandomChatResponse = (): string => {
    const randomIndex = Math.floor(Math.random() * CHAT_RESPONSES.length);
    return CHAT_RESPONSES[randomIndex];
}