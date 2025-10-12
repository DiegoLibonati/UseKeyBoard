export interface UseKeyBoardProps {
  config: {
    keys: { key: string; fn: (e: KeyboardEvent) => void }[];
    dependencies: React.DependencyList;
    debug: boolean;
  };
}