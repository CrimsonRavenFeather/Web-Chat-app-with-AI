const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyC413avafTHiTVKrLXysv87h_BR88cC_34"
const genAI = new GoogleGenerativeAI(API_KEY);

export async function AI_CHAT(prompt) {
  try {
    console.log("REQUEST ACQUIRED")
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (error) {
    console.log(error)
  }
}
