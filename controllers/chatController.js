import { handleHealthQuery } from "../agent/healthAgent.js";

export const chatController = async (req, res) => {

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: "É obrigatório preencher a mensagem!" });
  }

  const answer = await handleHealthQuery(message);

  return res.status(200).json({resposta: answer});
};
