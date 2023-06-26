import { atomWithStorage } from "jotai/utils";

export interface Prompt {
  id: string;
  title: string;
  content: string;
  create_time: string;
  update_time: string;
}

export const PromptStore = atomWithStorage<Prompt[]>("prompts", []);
