import React from "react";
import SocketType from "../../App/Models/SocketType";
import MachinePrototype from "../../App/Models/MachinePrototype";
import UUID from "../../shared/UUID";
import Machine from "../../App/Presenters/Machine/Machine";
import styled from "styled-components";
import RecordTypePicker from "../../App/Components/Menus/RecordTypePicker";
import RecordType, { RecordField } from "../../App/Models/RecordType";
import RecordData from "../../App/Models/Record";
import Wire from "../../App/Presenters/Wire/Wire";
import Socket from "../../App/Presenters/Socket/Socket";
import AppStore from "../../AppRoot/stores/AppStore";
import { useStores } from "../../Hooks/useStores";
import MergeIcon from "mdi-react/MergeIcon";

export default class Merge extends MachinePrototype {
  sockets = [
    {
      id: 0,
      title: "",
      typeID: UUID.Empty,
      type: SocketType.Input,
    },
    {
      id: 1,
      title: "",
      typeID: UUID.Empty,
      type: SocketType.Output,
    },
  ];

  id = UUID.FromString("33104b16-da81-4f4a-80c1-9e7d00e05d4b");
  name = "Обьединить";
  title = "Обьединить";
  isInvocable = false;

  initShape = { type: null };

  async invoke(
    self: Machine,
    params: RecordData[]
  ): Promise<RecordData[] | null> {
    return [
      {
        type: self.state.type,
        fields: params,
        value: null,
      },
    ]; // TODO
  }

  onWireConnected(appStore: AppStore, self: Machine, wire: Wire) {}

  content = (self: Machine, appStore: AppStore) => {
    /*  const changeType = (t: RecordType) => {
      self.state.type = t;

      self.detachWires(appStore);

      self.state.type = t;
      self.sockets[0].recordType = t;
      self.dynamicSockets = [];
      let i = 1;
      for (var fld of t!.fields) {
        self.dynamicSockets.push(
          new Socket(
            {
              type: SocketType.Input,
              title: fld.name,
              typeID: self.state.type!.id,
              id: i++,
            },
            appStore,
            self
          )
        );
      }
    }; */

    return <MergeIcon style={{color:"white"}} size={18}/>
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
