import { useCallback, useEffect } from "react";
import { UseKeyBoard, UseKeyBoardProps } from "./entities/entities";

export const useKeyBoard = ({ config }: UseKeyBoardProps): UseKeyBoard => {
  const { keys, debug, dependencies } = config;

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    keys.map((element) => {
      if (e.key === element.key) {
        element.fn();
        return;
      }
    });
  }, dependencies);

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("keydown", onKeyPress);
    };
  }, [onKeyPress]);

  useEffect(() => {
    if (debug && keys.length > 0) {
      keys.map((element) =>
        console.log(
          `Key %c${element.key}%c loaded ✅.`,
          "color: #09f",
          "color: initial"
        )
      );
      return;
    }

    if (debug && keys.length === 0) {
      return console.log("No keys have been added to the key Array ✅.");
    }
  }, []);
  return {};
};
