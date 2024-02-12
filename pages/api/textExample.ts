import { OpenAI } from "openai";

export async function GetOpenAIInstance(): Promise<OpenAI> {
  try {
    const openai = new OpenAI({
      apiKey: process.env['OPENAI_API_KEY'] as string,
    });
    return openai;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create OpenAI instance');
  }
}

export default async function(req, res) {
  const openai = await GetOpenAIInstance();
  let { temperature, userChat, aiResponseHistory, userChatHistory } = req.body;

  const messages = [
  { role: "system", content: `You are a helpful assistant.` },
];

for (let i = 0; i < aiResponseHistory.length; i++) {
  messages.push({ role: "assistant", content: `userChat History: ${userChatHistory[i]}.Persona Response: ${aiResponseHistory[i]}`},);
}
  messages.push( { role: "user", content: `Response to the user: ${userChat}. ` });
  
  try {
    const response = await await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      temperature: temperature,
    });
    res.status(200).json({ result: response.choices[0].message});
  } catch (error) {
    if (error.response) {
      console.log(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request",
        },
      });
    }
  }
}