import React from 'react';

interface ThreeDotsProps {
  size?: number; // Size of the SVG (width and height will be the same)
  color?: string; // Color of the dots
}

export function ThreeDots({ size = 120, color = '#fff' }: ThreeDotsProps) {
  // Calculate the viewBox based on the size
  const viewBox = `0 0 ${size} ${size / 4}`;
  // Calculate the positions and radius of the circles based on the size
  const radius = size / 8;
  const firstCircleX = radius;
  const secondCircleX = size / 2;
  const thirdCircleX = size - radius;

  return (
    <svg
      width={size}
      height={size / 4}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
    >
      <circle cx={firstCircleX} cy={radius} r={radius}>
        <animate
          attributeName="r"
          from={radius}
          to={radius}
          begin="0s"
          dur="0.8s"
          values={`${radius};${radius / 1.666};${radius}`}
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={secondCircleX} cy={radius} r={radius / 1.666} fillOpacity="0.3">
        <animate
          attributeName="r"
          from={radius / 1.666}
          to={radius / 1.666}
          begin="0s"
          dur="0.8s"
          values={`${radius / 1.666};${radius};${radius / 1.666}`}
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="0.5"
          to="0.5"
          begin="0s"
          dur="0.8s"
          values=".5;1;.5"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx={thirdCircleX} cy={radius} r={radius}>
        <animate
          attributeName="r"
          from={radius}
          to={radius}
          begin="0s"
          dur="0.8s"
          values={`${radius};${radius / 1.666};${radius}`}
          calcMode="linear"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fillOpacity"
          from="1"
          to="1"
          begin="0s"
          dur="0.8s"
          values="1;.5;1"
          calcMode="linear"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
