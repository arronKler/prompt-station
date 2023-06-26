import { useAtom } from "jotai";
import { Textarea, Input, Button } from "@mui/joy";
import { useState, useEffect } from "react";
import { WorkingState } from "@/store/working";
import { Save } from "@icon-park/react";
import { PromptStore } from "@/store/prompt";

export default function EditBox() {
  const [working] = useAtom(WorkingState);
  const [promptStore, setPromptStore] = useAtom(PromptStore);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (working) {
      setTitle(working.title);
      setContent(working.content);
    }
  }, [working?.id]);

  const savePrompt = () => {
    const targetIdx = promptStore.findIndex((p) => p.id === working?.id);
    const target = promptStore[targetIdx];

    if (!working) throw new Error("Working State should allways exist");

    if (!target) {
      setPromptStore((ps) => [
        ...ps,
        {
          ...working,
          title,
          content,
        },
      ]);
      return;
    }

    const promptClone = [...promptStore];
    promptClone.splice(targetIdx, 1, { ...working, title, content });
    setPromptStore(promptClone);
  };

  return (
    <>
      <Input
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title ?? ""}
        variant="soft"
        className="mb-2"
        placeholder="输入标题"
      ></Input>
      <Textarea
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        minRows={2}
        size="lg"
        variant="soft"
        placeholder="输入 Prompt 内容，用 {{keyword}} 表明使用时需要替换的关键字"
        endDecorator={
          <div className="flex justify-between w-full items-center border-t pt-2 border-t-slate-300">
            <div className="">
              字数 {content.length}, 约
              <span className=" font-bold mx-1 text-orange-400">
                {content.length * 2}
              </span>
              tokens
            </div>
            <div className="">
              <Button
                onClick={savePrompt}
                className=""
                size="sm"
                type="primary"
                variant="solid"
                startDecorator={<Save size="16" />}
              >
                保存
              </Button>
            </div>
          </div>
        }
      />
    </>
  );
}
