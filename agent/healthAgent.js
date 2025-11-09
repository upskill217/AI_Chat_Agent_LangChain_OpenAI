import { HumanMessage } from "@langchain/core/messages";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";

//load seed data
const rawData = fs.readFileSync(
  new URL("../data/seed.txt", import.meta.url),
  "utf-8"
);

//split into chunks
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
  chunkOverlap: 50,
});

//create docs
const docs = await splitter.createDocuments([rawData]);

export async function handleHealthQuery(question) {
  //build context
  const context = docs.map((d) => d.pageContent).join("\n");

  //create a prompt
  const prompt = `
  Você é um assistente de IA prestativo para questões de saúde

Instructions:
- Sempre responda usando o contexto abaixo.
- Se a pergunta do utilizador não estiver relacionada com saúde, aconselhamento médico, dieta, estilo de vida, doenças, sintomas ou produtos de saúde, responda exatamente: 
"Eu só consigo responder a perguntas relacionadas com saúde."."
- Nunca invente respostas fora do contexto.
- Mantenha as suas respostas claras e concisas.
  
  Context:${context}

  Question:${question}
  `;

  const response = await llm.invoke([new HumanMessage(prompt)]);
  
  return response.content;
}
