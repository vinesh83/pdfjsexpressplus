import OpenAI from 'openai';
import { Service } from '../types/services';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = apiKey ? new OpenAI({ apiKey, dangerouslyAllowBrowser: true }) : null;

export async function generateQuoteNotes(
  services: Service[],
  clientName: string,
  total: number
): Promise<string> {
  if (!openai || !apiKey) {
    throw new Error("OpenAI API key not configured");
  }

  const servicesText = services.map(service => 
    `${service.name} (Attorney Fee: $${service.attorneyFee}, Filing Fee: $${service.filingFee})`
  ).join('\n');

  const prompt = `
    As an immigration attorney, write a warm and professional note to accompany a fee quote.
    
    Client: ${clientName}
    Services:
    ${servicesText}
    Total: $${total}

    Write a personalized note that:
    1. Addresses the client by name
    2. Briefly explains each service in clear, non-technical language
    3. Emphasizes our commitment to their case
    4. Explains the fee breakdown in a transparent way
    5. Encourages them to reach out with questions
    6. Maintains a professional yet approachable tone
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a compassionate immigration attorney writing a personalized note to a client."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    return response.choices[0].message.content || "Unable to generate note";
  } catch (error: any) {
    if (error.code === 'invalid_api_key') {
      throw new Error("Invalid OpenAI API key");
    }
    throw new Error("Failed to generate note: " + error.message);
  }
}