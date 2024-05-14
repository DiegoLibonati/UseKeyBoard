import React from "react"

export type UseKeyBoard = {};

export interface UseKeyBoardProps {
  config: {
    keys: { key: string; fn: () => void }[];
    dependencies: React.DependencyList;
    debug: boolean;
  };
}