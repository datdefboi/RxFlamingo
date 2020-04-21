import React from "react";
import MachineCategory from "./MachineCategory";
import {useObserver} from "mobx-react-lite";
import styled from "styled-components";

export default ({state}: { state: MachineCategory }) =>
    useObserver(() => (
        <Wrapper style={{backgroundColor: state.color, minWidth: 40, height: 40}}>
            {state.icon()}
        </Wrapper>
    ));

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
