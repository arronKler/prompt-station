import { atom } from "jotai";
import { Prompt } from "./prompt";
import { createNewPrompt } from "@/lib/prompt";

export const WorkingState = atom<Prompt>(
  createNewPrompt("New Prompt", "I want you to act as a")
);

export const WorkingStringMap = atom<null | Map<string, string>>(null);
