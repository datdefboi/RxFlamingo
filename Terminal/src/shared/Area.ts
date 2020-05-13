import Point from "./Point";

export default class Area {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  static betweenPoints(a: Point, b: Point) {
    return new Area(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  }
}
