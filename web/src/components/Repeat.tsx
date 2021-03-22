import React from "react";

interface RepeatProps {
  n: number;
}

export const Repeat: React.FC<RepeatProps> = ({ n, children }) => {
  const toRender = [];

  for (var _i = 0; _i < n; _i++) {
    toRender.push(children);
  }
  return <>{toRender.map((i) => i)}</>;
};
