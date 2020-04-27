import React, { createElement, useState } from "react";
import styled from "styled-components";
import Point from "../../../shared/Point";
import ContextMenuContentProps from "./ContextMenuContentProps";

export default function ContextMenu({
  Content,
  Activator
}: {
  Content: (props:ContextMenuContentProps) => any;
  Activator: (onMouseDown: (ev: React.MouseEvent) => void) => React.ReactNode;
}) {
  const [pos, setPos] = useState(Point.Zero);
  const [isVisible, setIsVisible] = useState(false);

  function mouseDown(ev: React.MouseEvent) {
    if (ev.button === 2) {
      ev.preventDefault();
      setPos(new Point(ev.clientX, ev.clientY));
      setIsVisible(true);
    }
  }

  return (
    <>
      {Activator(mouseDown)}
      {isVisible ? (
        <MenuBackground onClick={ev => setIsVisible(false)}>
          <MenuContainer
            onClick={ev => {
              ev.stopPropagation();
            }}
            style={{
              transform: `translate(${pos.x}px, ${pos.y}px)`
            }}
          >
            <Content setVisible={setIsVisible} menuPos={pos} />
          </MenuContainer>
        </MenuBackground>
      ) : null}
    </>
  );
}

const MenuContainer = styled.div`
  position: fixed;
`;

const MenuBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
`;
