import UUID from "../../shared/UUID";
import SocketPrototype from "./SocketPrototype";
import MachineCategory from "../State/MachineCategory/MachineCategory";

export default interface MachinePrototype {
    name: string;
    blockTitle: string;
    id: UUID;
    docks: SocketPrototype[];
    category: MachineCategory;
}
