import React from "react";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType from "../../App/Models/RecordType";
import RecordData from "../../App/Models/Record";

export default class Constant extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: ">",
      typeID: UUID.Empty,
      type: SocketType.Output,
    },
  ];

  id = UUID.FromString("ff0d3a76-3727-45ad-b3d5-cc4f703b1c58\n");
  name = "Числовая константа";
  title = "";
  isInvocable = false;

  initShape = { type: null, value: null };

  async invoke(
    self: Machine,
    params: RecordData[]
  ): Promise<RecordData | null> {
    return { type: self.state.type, fields: [], value: self.state.value }; // TODO
  }

  content = (self: Machine) => {
    function RenderValue(t: RecordType) {
      return (
        <InputField
          onMouseDown={(ev) => ev.stopPropagation()}
          value={self.state.value}
          onChange={(ev) =>
            (self.state.value =
              (self.state.type as RecordType)?.buildinRepresentation == "number"
                ? +ev.target.value
                : ev.target.value)
          }
        />
      );
    }

    function ChangeType(type: RecordType) {
      self.state.type = type;
      self.sockets[0].recordType = type;
      self.state.value = type.defaultValue;
    }

    return (
      <>
        <TypeWrapper>
          <RecordTypePicker
            recordType={self.state.type}
            recordTypeChanged={(type) => ChangeType(type)}
          />
        </TypeWrapper>
        {self.state.type ? RenderValue(self.state.type) : null}
      </>
    );
  };
}

const TypeWrapper = styled.div`
  padding: 4px 12px;
  margin: 4px;
  border-radius: 20px;
  border: 1px solid gray;
  color: White;
`;

const InputField = styled.input`
  width: 60px;
  position: relative;
  background-color: transparent;
  border: gray 1px solid;
  margin: 4px 0 4px 0;
  padding: 2px 4px;
  font-size: 16px;
  border-radius: 8px;
  color: white;
  text-align: right;
`;
