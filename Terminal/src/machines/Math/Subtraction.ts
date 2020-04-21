import UUID from "../../shared/UUID";
import SocketType from "../../App/Models/SocketType";
import SocketPrototype from "../../App/Models/SocketPrototype";
import MachinePrototype from "../../App/Models/MachinePrototype";
import MachineCategory from "../../App/State/MachineCategory/MachineCategory";

export default class SubtractionMachine implements MachinePrototype {
  docks = [
    <SocketPrototype>{
      id: 0,
      title: "A",
      type: SocketType.Input
    },
    <SocketPrototype>{
      id: 1,
      title: "B",
      type: SocketType.Input
    },
    <SocketPrototype>{
      id: 2,
      title: "A-B",
      type: SocketType.Output
    }
  ];

  id: UUID = UUID.FromString("174c3038-3dcb-47e6-8049-44e6cd285bcc");
  name: string = "Вычитание";
  blockTitle = "Разность";

  category: MachineCategory;

  constructor(cat: MachineCategory) {
    this.category = cat
  }
}
