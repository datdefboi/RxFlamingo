import ContextMenuContentProps from "../App/Components/ContextMenu/ContextMenuContentProps";
import Point from "../shared/Point";
import React, { useState } from "react";
import styled from "styled-components";
import { useStores } from "./useStores";
import { observable } from "mobx";

export class ContextMenuState {
  @observable isContextVisible = false;
  @observable contextPosition = Point.Zero;
  @observable renderFunc: any;
}

export default function useContextMenu() {
  const context = useStores().appStore.contextMenu;
  const [content, setContent] = useState(null);
  return {
    useActivator(child: React.ReactNode) {
      /*  context.renderFunc = child; */
      /*  context.isContextVisible = true; */
      return <div onClick={() => console.log("activated")}>{child}</div>;
    },
    useContent(child: React.ReactNode) {
      return;
    },
  };
}

export function ContextMenuPresenter({
  context,
}: {
  context: ContextMenuState;
}) {
  return (
    <>
      {/* {context.renderFunc}
      {context.isContextVisible ? (
        <MenuBackground onClick={(ev) => (context.isContextVisible = false)}>
          <MenuContainer
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            style={{
              top: `${context.contextPosition.y}px`,
              left: `${context.contextPosition.x}px`,
            }}
          >
            {}
          </MenuContainer>
        </MenuBackground>
      ) : null} */}
    </>
  );
}

const MenuContainer = styled.div`
  position: absolute;
`;

const MenuBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;
