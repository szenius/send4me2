// eslint-disable-next-line import/no-unresolved
import { User } from "telegraf/typings/core/types/typegram";

type Voter = { firstName: string };
export type Option = { label: string; voters: Voter[] };

export interface Event {
  eventId: string;
  created: number;
  chatId: number;
  creator: User;
  description: string;
  options: Option[];
  dayOfWeek: "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
}
