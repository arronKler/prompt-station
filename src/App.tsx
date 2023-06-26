import SearchArea from "@/components/SearchArea";
import PromptArea from "@/components/PromptArea";
import Add from "@/components/Add";
import { show, hide } from "@tauri-apps/api/app";

import { appWindow } from "@tauri-apps/api/window";
import { register } from "@tauri-apps/api/globalShortcut";

let IS_SHOW = true;

// call out by shortcut
register("Option+E", async () => {
  if (IS_SHOW) {
    hide();
  } else {
    show();
    await appWindow.setFocus();
  }

  IS_SHOW = !IS_SHOW;
});

export default function App() {
  return (
    <div className="bg-slate-800 h-screen w-screen flex items-stretch relative">
      <SearchArea></SearchArea>
      <PromptArea></PromptArea>

      <Add></Add>
    </div>
  );
}
