import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const geminiModel = process.env.GEMINI_MODEL

export default class GeminiService {
  async gerarRespostaGemini(pergunta: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const result = await model.generateContent({
        contents: [
            {
            role: "user",
            parts: [{ text: pergunta }],
            },
        ],
        });

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Erro ao gerar resposta com Gemini:", error);
      throw new Error("Erro ao consultar modelo Gemini");
    }
  }
}
