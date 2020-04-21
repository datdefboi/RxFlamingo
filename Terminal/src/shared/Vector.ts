import Point from "./Point";

export default class Vector extends Point {
  get inverted() {
    return new Vector(-this.x, -this.y);
  }

  mul(v: number) {
    return new Vector(this.x * v, this.y * v);
  }
}
