import { useObserver } from "mobx-react-lite";
import Area from "../../../shared/Area";
import SocketType from "../../Models/document/SocketType";
import Vector from "../../../shared/Vector";
import Point from "../../../shared/Point";
import React from "react";
import Wire from "./Wire";

export default ({ state }: { state: Wire }) =>
  useObserver(() => {
    const dockSize = new Area(22, 19);
    const stroke = 11;

    let fromPoint = state.fromSocket!.getPositionAction();
    let toPoint = state.toSocket!.getPositionAction();

    /*   if (state.fromSocket!.type == SocketType.Input) {
      const t = fromPoint;
      fromPoint = toPoint;
      toPoint = t;
    }
 */
    const crossArea = Area.betweenPoints(fromPoint, toPoint);

    const startVector = new Vector(1, 0);
    const endVector = new Vector(-1, 0);

    const yxRatio = crossArea.height / crossArea.width;
    const horizontalDif = toPoint.x - fromPoint.x;
    let curvatureRatio =
      horizontalDif > 0
        ? Math.max(
            0,
            (Math.tanh(-2 * yxRatio + 2) / 3 + 4 / 6) *
              (-Math.sqrt(1 / 20 / yxRatio) + 1) *
              crossArea.width
          )
        : 0;

    if (Math.abs(curvatureRatio) == 1 / 0) curvatureRatio = 0;

    const supportWidth = 120;
    let supportLineRatio =
      (Math.tanh((-5 * horizontalDif) / supportWidth / 1.6) / 2 + 1 / 2) *
        supportWidth ?? 0;

    if (supportLineRatio < 1) supportLineRatio = 0;

    const startTarget = startVector
      .mul(curvatureRatio)
      .plus(startVector.mul(supportLineRatio))
      .plus(fromPoint);
    const endTarget = endVector
      .mul(curvatureRatio)
      .plus(endVector.mul(supportLineRatio))
      .plus(toPoint);

    const [xs, ys] = Point.components(
      fromPoint,
      toPoint,
      startTarget,
      endTarget
    );

    const leftTopBound = new Point(Math.min(...xs), Math.min(...ys));
    const rightBottomBound = new Point(Math.max(...xs), Math.max(...ys));
    const splainArea = Area.betweenPoints(leftTopBound, rightBottomBound);

    const height = splainArea.height + dockSize.height;
    const width = splainArea.width + dockSize.width * 2;

    const transition = `translate(${leftTopBound.x -
      dockSize.width}px,${leftTopBound.y - stroke + 2}px)`;

    const offsetY = -leftTopBound.y + dockSize.height / 2;
    const offsetX = -leftTopBound.x + dockSize.width;

    function RenderRightDock(pos: Point) {
      return (
        <path
          transform={`translate(${pos.x -
            leftTopBound.x -
            1 +
            dockSize.width},${pos.y + offsetY - dockSize.height / 2})`}
          d="M22 14.5L16 19L3.49691e-07 15L-5.96007e-07 4L16 1.56163e-06L22 4.5L22 14.5Z"
          fill={state.fromSocket?.recordType?.color}
        />
      );
    }

    function RenderLeftDock(pos: Point) {
      return (
        <path
          transform={`translate(${pos.x - leftTopBound.x + 1},${pos.y +
            offsetY -
            dockSize.height / 2})`}
          d="M0 4.50001L5.99998 3.8147e-06L22 4L22 15L5.99998 19L0 14.5L0 4.50001Z"
          fill={state.fromSocket?.recordType?.color}
        />
      );
    }

    return (
      <svg
        style={{
          height,
          width,
          cursor: "crosshair",
          zIndex: 2,
          position: "absolute",
          transform: transition,
        }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <path
          d={`M ${fromPoint.x + offsetX} ${fromPoint.y + offsetY} 
                    C ${startTarget.x + offsetX} ${startTarget.y + offsetY},
                     ${endTarget.x + offsetX} ${endTarget.y + offsetY},
                      ${toPoint.x + offsetX} ${toPoint.y + offsetY}`}
          stroke={state.fromSocket?.recordType?.color}
         /*  stroke-dasharray="20,20" */
          strokeWidth={stroke}
          stroke-linecap="round"
          fill="transparent"
        />

        {RenderLeftDock(fromPoint)}
        {RenderRightDock(toPoint)}
      </svg>
    );
  });
