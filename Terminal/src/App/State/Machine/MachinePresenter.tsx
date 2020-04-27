import { useObserver } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import Machine from "./Machine";
import SocketType from "../../Models/SocketType";
import SocketPresenter from "../Socket/SocketPresenter";
import Block from "./Block";

export default ({ state }: { state: Machine }) => {
  function Spacer({ style }: { style: any }) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: state.proto.category.color,
          flex: 1
        }}
      />
    );
  }

  const inputSockets = state.sockets.filter(p => p.type === SocketType.Input);
  const outputSockets = state.sockets.filter(p => p.type === SocketType.Output);

  return useObserver(() => (
    <Block state={state}>
      <DocksLine>
        <Spacer style={{}} />
        {inputSockets.map(i => (
          <SocketPresenter key={i.id} state={i} />
        ))}
        <Spacer style={{}} />
      </DocksLine>
      <Spacer
        style={{
          width: inputSockets.length ? 10 : 0,
          paddingTop: 4,
          paddingBottom: 4
        }}
      />
      <ContentContainer style={{ backgroundColor: state.proto.category.color }}>
        {state.proto.content(state)}
      </ContentContainer>
      <Spacer
        style={{
          width: outputSockets.length ? 10 : 0,
          paddingTop: 4,
          paddingBottom: 4
        }}
      />
      <DocksLine>
        <Spacer style={{}} />
        {outputSockets.map(i => (
          <SocketPresenter key={i.id} state={i} />
        ))}
        <Spacer style={{}} />
      </DocksLine>
    </Block>
  ));
};

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DocksLine = styled.div`
  flex: 0;
  display: flex;
  flex-direction: column;
`;
