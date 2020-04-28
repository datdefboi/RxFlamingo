import React, { createElement, useState } from "react";
import styled from "styled-components";
import Point from "../../../shared/Point";
import ContextMenuContentProps from "./ContextMenuContentProps";

export default function ContextMenu({
  Content,
  Activator,
}: {
  Content: (props: ContextMenuContentProps) => any;
  Activator: (show: (point: Point) => void) => React.ReactNode;
}) {
  const [pos, setPos] = useState(Point.Zero);
  const [isVisible, setIsVisible] = useState(false);

  function onActivation(pos: Point) {
    setPos(pos);
    setIsVisible(true);
  }

  return (
    <>
      {Activator(onActivation)}
      {isVisible ? (
        <MenuBackground onClick={(ev) => setIsVisible(false)}>
          <MenuContainer
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            style={{
              top: `${pos.y}px`,
              left: `${pos.x}px`,
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
  position: absolute;
`;

const MenuBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;
