// eslint-disable-next-line import/no-unresolved
import { User } from "telegraf/typings/core/types/typegram";

type Voter = User;
export type Option = { label: string; voters: Voter[] };

export interface Event {
  eventId: string;
  created: number;
  chatId: number;
  creator: User;
  description: string;
  options: string[];
  dayOfWeek: "SUN" | "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT";
}

export interface Message {
  eventId: string;
  messageId: string;
  created: number;
  chatId: number;
  description: string;
  options: Option[];
}
