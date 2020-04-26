import Point from "../../../shared/Point";

export default interface ContextMenuContentProps {
  setVisible: (val: boolean) => void;
  menuPos: Point;
}
