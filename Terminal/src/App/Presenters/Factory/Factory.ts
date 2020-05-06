import Point from "../../../shared/Point";
import { action, observable } from "mobx";
import Wire from "../Wire/Wire";
import Machine from "../Machine/Machine";

export default class Factory {
  @observable instances: Machine<any>[] = [];
  @observable linkerWire: Wire | null = null;
  @observable viewOffset: Point = Point.Zero;

  @observable warps: Machine<any>[] = [];

  @action setViewOffset(pos: Point) {
    this.viewOffset = pos;
  }
}
