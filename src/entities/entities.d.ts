import React from "react";

export type UseKeyBoard = {};

export interface UseKeyBoardProps {
  config: {
    keys: { key: string; fn: (e: KeyboardEvent) => void }[];
    dependencies: React.DependencyList;
    debug: boolean;
  };
}
