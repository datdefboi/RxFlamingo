import { useObserver } from "mobx-react-lite";
import React from "react";
import styled from "styled-components";
import Machine from "./Machine";
import SocketType from "../../Models/document/SocketType";
import SocketPresenter from "../Socket/SocketPresenter";
import Block from "./Block";
import { useStores } from "../../../Hooks/useStores";

export default ({ state }: { state: Machine<any> }) => {
  const { appStore } = useStores();

  function Spacer({ style }: { style: any }) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: state.color,
          flex: 1,
        }}
      />
    );
  }

  const allSockets = [...state.sockets, ...state.dynamicSockets];
  const inputSockets = allSockets.filter((p) => p.type === SocketType.Input);
  const outputSockets = allSockets.filter((p) => p.type === SocketType.Output);

  return useObserver(() => (
    <Block state={state}>
      <DocksLine>
        <Spacer style={{}} />
        {inputSockets.map((i) => (
          <SocketPresenter key={i.id * i.type ? 1 : -1} state={i} />
        ))}
        <Spacer style={{}} />
      </DocksLine>
      <Spacer
        style={{
          width: inputSockets.length ? 10 : 0,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      />
      <ContentContainer style={{ backgroundColor: state.color }}>
        {state.proto.content(state, appStore)}
      </ContentContainer>
      <Spacer
        style={{
          width: outputSockets.length ? 10 : 0,
          paddingTop: 4,
          paddingBottom: 4,
        }}
      />
      <DocksLine>
        <Spacer style={{}} />
        {outputSockets.map((i) => (
          <SocketPresenter key={i.id * i.type ? 1 : -1} state={i} />
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
