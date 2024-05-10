import React from "react";

function ProgressBar({bar}) {


  return (
    <div className="w-9/10 bg-gray-300 rounded-full h-1">
      <div className={`bg-blue-600 h-1 rounded-full`} style = {{width : `${bar}px`}}></div>
    </div>
  );
}

export default ProgressBar;
