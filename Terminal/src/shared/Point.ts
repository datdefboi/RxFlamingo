export default class Point {
  static Zero: Point = new Point(0, 0);
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static components(...px: Point[]) {
    const xs = [];
    const ys = [];
    for (var p of px) {
      xs.push(p.x);
      ys.push(p.y);
    }
    return [xs, ys];
  }

  plus(v: Point) {
    return new Point(this.x + v.x, this.y + v.y);
  }

  sub(v: Point) {
    return new Point(this.x - v.x, this.y - v.y);
  }
}
