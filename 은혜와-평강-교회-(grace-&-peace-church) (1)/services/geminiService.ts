import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a comforting message, bible verse, and prayer based on user's mood.
 */
export const generateSpiritualComfort = async (mood: string): Promise<{ verse: string; prayer: string }> => {
  try {
    // Add a random seed concept to the prompt text to encourage variety
    const prompt = `
      당신은 친절하고 지혜로운 목회자이자 상담가입니다.
      사용자가 현재 "${mood}"의 감정을 느끼고 있습니다.
      이 사용자에게 위로와 힘이 되는 한국어 성경 구절(개역개정) 하나와,
      짧고 따뜻한 기도문(100자 이내)을 작성해주세요.
      
      중요: 매번 요청마다 다른 성경 구절과 다른 내용의 기도문을 추천해주세요. 
      너무 뻔하지 않은, 상황에 딱 맞는 은혜로운 말씀을 부탁합니다.

      형식은 반드시 JSON으로 출력해주세요:
      {
        "verse": "성경 구절 (장:절 포함)",
        "prayer": "기도문 내용"
      }
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 1.2, // Increase creativity for variety
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(text);
    return {
      verse: data.verse || "여호와는 나의 목자시니 내게 부족함이 없으리로다 (시편 23:1)",
      prayer: data.prayer || "주님, 오늘 하루도 주님의 은혜 안에 평안하게 하소서."
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of error
    return {
      verse: "수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라 (마태복음 11:28)",
      prayer: "사랑의 하나님, 힘든 마음을 위로해주시고 다시 일어설 힘을 주시옵소서. 예수님의 이름으로 기도드립니다. 아멘."
    };
  }
};