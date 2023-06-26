import { Copy } from "@icon-park/react";
import { writeText } from "@tauri-apps/api/clipboard";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";

import { useAtom } from "jotai";

import PreviewBox from "./prompt-area/PreviewBox";
import EditBox from "./prompt-area/EditBox";
import { RadioGroup, Radio } from "@mui/joy";
import { useState, useCallback } from "react";
import { WorkingState } from "@/store/working";

const MODE = ["raw", "preview"];

export default function PromptArea() {
  const [mode, setMode] = useState("raw");

  const [working] = useAtom(WorkingState);

  const handleCopy = useCallback(async () => {
    const content = working?.content ?? "";

    await writeText(content);

    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
    if (permissionGranted) {
      sendNotification({
        title: "复制提示",
        body: "Copy Success!",
      });
    }
  }, [working]);

  return (
    <div className=" w-full p-3 flex flex-col">
      <div className="py-2 flex justify-between items-center">
        <RadioGroup
          orientation="horizontal"
          aria-labelledby="segmented-controls-example"
          name="justify"
          value={mode}
          className="bg-slate-400 p-1"
          onChange={(e) => {
            setMode(e.target.value);
          }}
        >
          {MODE.map((m) => (
            <Radio
              key={m}
              color="neutral"
              value={m}
              disableIcon
              label={m}
              variant="plain"
              className="block px-2"
              slotProps={{
                radio: {
                  sx: {
                    borderRadius: "8px",
                  },
                },
                action: ({ checked }) => ({
                  sx: {
                    ...(checked && {
                      background: "#fff",
                    }),
                  },
                }),
              }}
            ></Radio>
          ))}
        </RadioGroup>

        <div className="flex items-center">
          <Copy
            onClick={handleCopy}
            className="flex items-center hover:text-slate-300 cursor-pointer"
            size="16"
          ></Copy>
        </div>
      </div>
      <div className=" p-2 rounded-md bg-slate-400">
        {mode === "raw" && <EditBox></EditBox>}
        {mode === "preview" && <PreviewBox></PreviewBox>}
      </div>
    </div>
  );
}
