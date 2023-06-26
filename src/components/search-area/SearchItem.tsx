import { useCallback } from "react";
import { Prompt, PromptStore } from "@/store/prompt";
import { useAtom } from "jotai";
import { Delete } from "@icon-park/react";

interface SearchItemProps extends Prompt {
  onItemClick: () => void;
  confirm: (title: string) => Promise<boolean>;
}

export default function SearchItem({
  id,
  title,
  onItemClick,
  confirm,
}: SearchItemProps) {
  const [promptStore, setPromptStore] = useAtom(PromptStore);
  const handleRemove = useCallback(async () => {
    const confirmed = await confirm(title);

    if (!confirmed) return;
    const targetIdx = promptStore.findIndex((p) => p.id === id);
    if (targetIdx > -1) {
      const psClone = [...promptStore];
      psClone.splice(targetIdx, 1);
      setPromptStore(psClone);
    }
  }, [promptStore]);

  return (
    <div
      className=" p-2 cursor-pointer hover:bg-slate-400 transition-all flex items-center"
      onClick={onItemClick}
    >
      <span className="flex-1">{title}</span>

      <Delete
        onClick={handleRemove}
        className=" ml-1 mr-1 h-full items-center flex hover:text-red-500 shrink-0"
        size="14"
      ></Delete>
    </div>
  );
}
