// eslint-disable-next-line import/no-unresolved
import { User } from "telegraf/typings/core/types/typegram";

export interface Event {
  eventId: string;
  created: number;
  chatId: number;
  creator: User;
  description: string;
  options: string[];
  dayOfWeek: "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
}
