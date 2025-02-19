import { sendTestQuestion } from "../utils/testHandler.js";

export default async (ctx) => {
  const data = ctx.match[0].split("_");
  const answer = data[1];
  const index = parseInt(data[2]);
  const answers = { A: parseInt(data[3]), B: parseInt(data[4]), C: parseInt(data[5]) };

  // Увеличиваем счетчик выбранного варианта
  answers[answer]++;

  // Отправляем следующий вопрос или итог
  await sendTestQuestion(ctx, index + 1, answers);
}