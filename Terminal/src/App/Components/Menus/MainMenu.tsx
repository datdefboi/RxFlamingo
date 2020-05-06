import styled from "styled-components";
import React from "react";
import { stores } from "../../../AppRoot/App";

export default function(props: {}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <MenuEntry
        onClick={() => {
          stores.appStore.save();
        }}
      >
        save
      </MenuEntry>
    </div>
  );
}

const MenuEntry = styled.div`
  border: 1px gray solid;
  display: flex;
  color: white;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  flex: 1;
`;
