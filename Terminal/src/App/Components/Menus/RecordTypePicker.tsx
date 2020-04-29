import React, { useState } from "react";
import styled from "styled-components";
import { useStores } from "../../../Hooks/useStores";
import MachineCategory from "../../Models/MachineCategory";
import ContextMenuContentProps from "../ContextMenu/ContextMenuContentProps";
import RecordType from "../../Models/RecordType";
import ContextMenu from "../ContextMenu/ContextMenu";
import Point from "../../../shared/Point";

export default function RecordTypePicker({
  recordType,
  recordTypeChanged,
}: {
  recordType: RecordType | null;
  recordTypeChanged: (record: RecordType) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const { appStore } = useStores();
  const pkg = appStore.currentPackage;

  return (
    <>
      <TypeTitle onMouseDown={(ev) => setIsVisible(true)}>
        {recordType ? recordType.name : "Не выбрано"}
      </TypeTitle>
      {isVisible ? (
        <Card onMouseDown={(ev) => ev.stopPropagation()}>
          <CloseButton onClick={() => setIsVisible(false)}>Скрыть</CloseButton>
          {pkg.records.map((r) => (
            <RecordItem
              onClick={() => {
                recordTypeChanged(r);
                setIsVisible(false);
              }}
            >
              {r.name}
            </RecordItem>
          ))}
          {appStore.loadedPackages.map((p) =>
            p.records.map((r) => (
              <RecordItem
                onClick={() => {
                  recordTypeChanged(r);
                  setIsVisible(false);
                }}
              >
                {r.name}
              </RecordItem>
            ))
          )}
        </Card>
      ) : null}
    </>
  );
}

const TypeTitle = styled.div`
  font-size: 12px;
`;

const CloseButton = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid gray;
  cursor: pointer;
  :hover {
    background-color: #ffffff22;
  }
`;

const RecordItem = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 8px;
  cursor: pointer;
  :hover {
    background-color: #ffffff22;
  }
`;

const Card = styled.div`
  min-width: 200px;
  min-height: 200px;
  background-color: #14151b;
  border-radius: 4px;
  position: absolute;
  z-index: 5;
  color: white;
  font-family: Arial;
`;
