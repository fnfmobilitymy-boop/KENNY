"use client";
import { useId } from "react";
export function SampleArt({
  name,
  palette = "violet",
  variant = 0,
}: {
  name: string;
  palette?: string;
  variant?: number;
}) {
  const id = useId();
  const colors =
    palette === "peach"
      ? ["#f9b9a8", "#9171d8"]
      : palette === "blue"
        ? ["#94c4ff", "#4d4a9c"]
        : ["#bea5ff", "#5964c8"];
  return (
    <svg
      className="sample-vector"
      viewBox="0 0 400 300"
      role="img"
      aria-label={`Fixed vector sample: ${name}`}
    >
      <defs>
        <linearGradient id={id} x2="1" y2="1">
          <stop stopColor={colors[0]} />
          <stop offset="1" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="#141426" />
      {variant % 2 === 0 ? (
        <>
          <ellipse
            cx="200"
            cy="154"
            rx="128"
            ry="44"
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="2"
            transform="rotate(-32 200 154)"
          />
          <circle cx="200" cy="150" r="68" fill={`url(#${id})`} />
          <circle cx="279" cy="91" r="9" fill={colors[0]} />
        </>
      ) : (
        <>
          <path d="M98 243V112l102-60 102 60v131z" fill={`url(#${id})`} />
          <path
            d="M200 52v191H98M200 160l102-48"
            fill="none"
            stroke="#141426"
            strokeWidth="2"
          />
          <circle cx="294" cy="63" r="20" fill={colors[0]} />
        </>
      )}
      <text x="22" y="277" fill="#dedcf5" fontSize="10" letterSpacing="2">
        FIXED VECTOR STUDY / DEMO
      </text>
    </svg>
  );
}
