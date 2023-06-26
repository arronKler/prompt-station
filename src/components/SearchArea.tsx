import { useCallback, useState, useMemo } from "react";
import SearchItem from "@/components/search-area/SearchItem";
import { useAtom } from "jotai";
import { Prompt, PromptStore } from "@/store/prompt";

import Input from "@mui/base/Input";
import { WorkingState } from "@/store/working";

export default function SearchArea() {
  const [prompts] = useAtom(PromptStore);
  const [_, setWorking] = useAtom(WorkingState);
  const [keyword, setKeyword] = useState<string>("");

  const searchList = useMemo(() => {
    return prompts.filter((prompt) => prompt.title.includes(keyword));
  }, [prompts, keyword]);

  const handlePromptActive = useCallback((prompt: Prompt) => {
    setWorking({ ...prompt } as Prompt);
  }, []);

  const handleConfirm = useCallback(async (title: string) => {
    console.log("title", title);
    return true;
  }, []);

  return (
    <div className=" px-3 py-2 w-80 my-2 flex flex-col">
      <div className="shrink-0 pb-2">
        <Input
          slotProps={{
            input: {
              className:
                "px-2 py-1 rounded-md outline-none line-height-1 border border-transparent focus:border-slate-300",
            },
            root: {
              className: " outline-none rounded-md ",
            },
          }}
          // variant="outlined"
          // size="sm"
          placeholder="🔍 搜索标题"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </div>

      <div className=" flex-1 overflow-y-auto overflow-x-hidden rounded-md border border-slate-300">
        {searchList.map((prompt) => (
          <SearchItem
            key={prompt.id}
            onItemClick={() => handlePromptActive(prompt)}
            confirm={handleConfirm}
            {...prompt}
          />
        ))}
      </div>
    </div>
  );
}
