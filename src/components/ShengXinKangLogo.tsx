import React from "react";

export function ShengXinKangLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="sun-gradient"
          cx="38%"
          cy="38%"
          r="62%"
          fx="30%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#FFFFEE" />
          <stop offset="35%" stopColor="#FFDC35" />
          <stop offset="100%" stopColor="#EA9500" />
        </radialGradient>
      </defs>

      {/* Golden Sun Sphere */}
      <circle
        cx="128"
        cy="72"
        r="25"
        fill="url(#sun-gradient)"
      />

      {/* Left Small Accent Brushstroke */}
      <path
        d="M 22 130 C 18 138, 23 142, 28 136 C 38 124, 55 96, 62 82 C 64 77, 59 74, 55 79 C 42 96, 26 118, 22 130 Z"
        fill="#93a28f"
      />

      {/* Main Mountain & Sweeping Wave */}
      <path
        d="M 54 130 C 50 136, 54 139, 58 134 C 66 122, 77 96, 82 81 C 85 73, 91 74, 93 82 C 103 105, 122 144, 150 150 C 168 154, 181 144, 186 130 C 188 126, 184 125, 181 128 C 173 138, 160 143, 146 141 C 124 136, 106 102, 94 83 C 91 78, 86 78, 84 83 C 74 102, 63 118, 54 130 Z"
        fill="#93a28f"
      />
    </svg>
  );
}
