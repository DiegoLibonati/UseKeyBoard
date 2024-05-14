export type UseKeyBoard = {};

export interface UseKeyBoardProps {
  config: {
    keys: { key: string; fn: () => void }[];
    dependencies: DependencyList;
    debug: boolean;
  };
}