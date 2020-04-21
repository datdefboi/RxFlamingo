import UUID from "../../shared/UUID";
import SocketType from "../../App/Models/SocketType";
import SocketPrototype from "../../App/Models/SocketPrototype";
import MachinePrototype from "../../App/Models/MachinePrototype";
import MachineCategory from "../../App/State/MachineCategory/MachineCategory";

export default class AdditionMachine implements MachinePrototype {
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
      title: "AB",
      type: SocketType.Output
    }
  ];

  id: UUID = UUID.FromString("d1023e29-58b4-4fb6-a7e0-f94a2f71442d");
  name: string = "Склеивание строк";
  blockTitle = "Склеить";

  category: MachineCategory;

  constructor(cat: MachineCategory) {
    this.category = cat;
  }
}
