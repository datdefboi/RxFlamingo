import ContextMenu from "./ContextMenu";
import React from "react";

export default {
  component: ContextMenu,
  title: "Context menu",
};

export const SimpleSample = () => (
  <ContextMenu
    activator={(onMouseDown) => (
      <div
        style={{ backgroundColor: "black", width: 200, height: 200 }}
        onContextMenu={onMouseDown}
      >
        open me
      </div>
    )}
  >
    Some menu content
  </ContextMenu>
);
