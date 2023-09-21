import { View, PanResponder } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { BoardData, LineStyleParams } from "../../../types";
import Svg, { Circle, Defs, G, Line, Marker, Path } from "react-native-svg";
export default function LineContent({
  pos,
  index,
  onClick,
  boardData,
  setBoardData,
  pathValues,
  style,
  editMode,
}: {
  pos: { x: number; y: number };
  index: number;
  onClick?: (() => void) | undefined;
  boardData: BoardData;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  pathValues: {
    left: { x: number; y: number };
    center: { x: number; y: number };
    right: { x: number; y: number };
  };
  style: LineStyleParams;
  editMode: boolean;
}) {
  const [leftX, setLeftX] = useState<number>(pathValues.left.x || 0);
  const [leftY, setLeftY] = useState<number>(pathValues.left.y || 100);
  const [centerX, setCenterX] = useState<number>(pathValues.center.x || 0);
  const [centerY, setCenterY] = useState<number>(pathValues.center.y || 0);
  const [rightX, setRightX] = useState<number>(pathValues.right.x || 100);
  const [rightY, setRightY] = useState<number>(pathValues.right.y || 15);

  const handleControlPointMove = (point: string, dx: number, dy: number) => {
    if (point === "left") {
      setLeftX(leftX + dx);
      setLeftY(leftY + dy);
    } else if (point === "center") {
      setCenterX(centerX + dx);
      setCenterY(centerY + dy);
    } else if (point === "right") {
      setRightX(rightX + dx);
      setRightY(rightY + dy);
    }
  };

  const path = `
      M ${leftX} ${leftY}
      Q ${2 * centerX - (leftX + rightX) / 2} ${
    2 * centerY - (leftY + rightY) / 2
  }
        ${rightX} ${rightY}
        
    `;

  const pathFixed = `
    M ${leftX} ${leftY}
    L ${centerX} ${centerY}
    L ${rightX} ${rightY}
  `;

  const circleCenterRef = useRef<any>(null);
  const circleRightRef = useRef<any>(null);

  const panResponderLeft = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      handleControlPointMove("left", dx, dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const item = boardData[index];
      item.content.data = {
        left: { x: leftX, y: leftY },
        center: { x: centerX, y: centerY },
        right: { x: rightX, y: rightY },
      };
      setBoardData([...boardData]);
    },
    onPanResponderTerminate: () => {},
  });

  const panResponderCenter = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderStart: () => {
      onClick?.();
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      handleControlPointMove("center", dx, dy);
      circleCenterRef.current.setNativeProps({
        cx: centerX + dx,
        cy: centerY + dy,
      });
    },
    onPanResponderRelease: () => {
      const item = boardData[index];
      item.content.data = {
        left: { x: leftX, y: leftY },
        center: { x: centerX, y: centerY },
        right: { x: rightX, y: rightY },
      };
      setBoardData([...boardData]);
    },
    onPanResponderTerminate: () => {},
  });

  const panResponderRight = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      handleControlPointMove("right", dx, dy);
      circleRightRef.current.setNativeProps({
        cx: rightX + dx,
        cy: rightY + dy,
      });
    },
    onPanResponderRelease: () => {
      const item = boardData[index];
      item.content.data = {
        left: { x: leftX, y: leftY },
        center: { x: centerX, y: centerY },
        right: { x: rightX, y: rightY },
      };
      setBoardData([...boardData]);
    },
    onPanResponderTerminate: () => {},
  });

  const pathExtremes = useMemo(() => {
    const minX = Math.min(leftX, centerX, rightX);
    const maxX = Math.max(leftX, centerX, rightX);
    const minY = Math.min(leftY, centerY, rightY);
    const maxY = Math.max(leftY, centerY, rightY);
    const svgWidth = maxX;
    const svgHeight = maxY;
    return { minX, maxX, minY, maxY, svgWidth, svgHeight };
  }, [leftX, leftY, centerX, centerY, rightX, rightY]);

  const pathRef = useRef<Path>(null);

  return (
    <G transform={`translate(${pos.x / 1.5},${pos.y / 1.5})`}>
      <Defs>
        <Marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="1"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="4"
          markerHeight="3"
          orient="auto"
        >
          <Path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
        </Marker>
      </Defs>

      <Defs>
        <Marker
          id="arrow1"
          viewBox="0 0 10 10"
          refX="17"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="4"
          markerHeight="3"
          orient="auto"
        >
          <Path d="M 0 0 L 7 10 L 10 0 z" fill="context-stroke" />
        </Marker>
      </Defs>

      <Path
        d={path}
        stroke="#6C68A8"
        strokeWidth={2}
        fill="none"
        markerEnd={style.showEnd ? "url(#arrow)" : ""}
        markerStart={style.showStart ? "url(#arrow1)" : ""}
        ref={pathRef}
      />

      <Circle
        cx={leftX}
        cy={leftY}
        r={5}
        fill="white"
        stroke={"lightgray"}
        {...panResponderLeft.panHandlers}
      />

      <Circle
        ref={circleCenterRef}
        cx={centerX}
        cy={centerY}
        r={5}
        fill="white"
        stroke={"lightgray"}
        {...panResponderCenter.panHandlers}
      />

      <Circle
        ref={circleRightRef}
        cx={rightX}
        cy={rightY}
        fill="none"
        r={10}
        {...panResponderRight.panHandlers}
      />

      <Circle
        ref={circleRightRef}
        cx={rightX}
        cy={rightY}
        fill="none"
        r={10}
        {...panResponderRight.panHandlers}
      />
    </G>
  );
}
