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
      title: "A+B",
      type: SocketType.Output
    }
  ];

  id: UUID = UUID.FromString("ae5eb614-a1ee-4382-9b09-c4a5e9c296a7");
  name: string = "Суммирование";
  blockTitle = "Сумма";
  category: MachineCategory;

  constructor(cat: MachineCategory) {
    this.category = cat
  }

}
