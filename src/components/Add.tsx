import { useCallback } from "react";
import { useAtom } from "jotai";
import { Plus } from "@icon-park/react";
import { WorkingState } from "@/store/working";
import { createNewPrompt } from "@/lib/prompt";

export default function Add() {
  const [_, setWorking] = useAtom(WorkingState);

  const createNew = useCallback(() => {
    setWorking(createNewPrompt("New Prompt", "I want you to act as a"));
  }, []);

  return (
    <div
      className="fixed bottom-3 right-3 z-50 rounded-full flex items-center justify-center bg-slate-500 shadow-md hover:bg-slate-600 p-2 cursor-pointer hover:-translate-y-1 transition-all"
      onClick={createNew}
    >
      <Plus size="24"></Plus>
    </div>
  );
}
