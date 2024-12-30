import React from "react";

function Loading() {
  return (
    <div className="flex p-3">
      <div class="flex space-x-2 justify-center items-center bg-white">
        <div class="h-2 w-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-2 w-2 bg-slate-300 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
}

export default Loading;
