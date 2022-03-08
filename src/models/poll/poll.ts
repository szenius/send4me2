import { Key, Keyboard } from "telegram-keyboard";
import { Option } from "../../types";

export const createPoll = (description: string, options: Option[]) => {
  const optionsDisplay = options.map(({ label, voters }) =>
    [
      `*${label} - ${voters.length}*`,
      ...voters.map((voter) => voter.first_name),
    ].join("\n")
  );
  const numResponses = options.reduce(
    (sum: number, { voters }: Option) => sum + voters.length,
    0
  );
  const message = [
    description,
    ...optionsDisplay,
    `👥 *${numResponses}* response(s)`,
  ].join("\n\n");

  const keyboard = Keyboard.make(
    options.map(({ label }, index) => [Key.callback(label, `VOTE_${index}`)])
  );

  return { message, inlineKeyboard: keyboard.inline() };
};

export const createNewPoll = (description: string, options: string[]) =>
  createPoll(
    description,
    options.map((label) => ({ label, voters: [] }))
  );
