import Point from "../../../shared/Point";
import {action, observable} from "mobx";
import Wire from "../Wire/Wire";
import Machine from "../Machine/Machine";

export default class Factory {
  @observable instances: Machine[] = [];
  @observable wires: Wire[] = [];
  @observable linkerWire: Wire | null = null;
  @observable viewOffset: Point = Point.Zero;

  @action setViewOffset(pos: Point) {
    this.viewOffset = pos;
  }
}
