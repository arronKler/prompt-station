import { v4 as uuidv4 } from "uuid";

import dayjs from "dayjs";
import { Prompt } from "@/store/prompt";

export function createNewPrompt(title: string, content: string): Prompt {
  const time = dayjs().unix().toString();

  return {
    id: uuidv4(),
    title,
    content,
    create_time: time,
    update_time: time,
  } as Prompt;
}
