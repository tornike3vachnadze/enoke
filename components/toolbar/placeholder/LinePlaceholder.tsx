import { View, PanResponder } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { BoardData } from "../../../types";
import Svg, { Circle, Defs, G, Line, Marker, Path } from "react-native-svg";
export default function LinePlaceholder({
  pos,
}: {
  pos: { x: number; y: number };
}) {
  const pathValues = {
    left: {
      x: 0,
      y: 100,
    },
    center: {
      x: 0,
      y: 0,
    },
    right: {
      x: 100,
      y: 15,
    },
  };

  const path = `
      M ${pathValues.left.x} ${pathValues.left.y}
      Q ${
        2 * pathValues.center.x - (pathValues.left.x + pathValues.right.x) / 2
      } ${
    2 * pathValues.center.y - (pathValues.left.y + pathValues.right.y) / 2
  }
        ${pathValues.right.x} ${pathValues.right.y}
        
    `;

  const pathRef = useRef<Path>(null);

  return (
    <Svg
      width={500}
      height={500}
      viewBox="0 0 1000 1000"
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        transform: [{ scale: 3 }, { translateX: 150 }, { translateY: 150 }],
      }}
      className="opacity-50"
    >
      <G transform={`scale(${1})`}>
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
          <Path
            d={path}
            stroke="#6C68A8"
            strokeWidth={2}
            fill="none"
            markerEnd="url(#arrow)"
            ref={pathRef}
          />
        </G>
      </G>
    </Svg>
  );
}
