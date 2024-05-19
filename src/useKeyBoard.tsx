import { useCallback, useEffect } from "react";
import { UseKeyBoard, UseKeyBoardProps } from "./entities/entities";

export const useKeyBoard = ({ config }: UseKeyBoardProps): UseKeyBoard => {
  const { keys, debug, dependencies } = config;

  const onKeyPress = useCallback((e: KeyboardEvent) => {
    keys.forEach((element) => {
      if (element.key === "|" && e.key === element.key) {
        element.fn(e);
        return;
      }

      if (element.key.includes("|")) {
        const multipleKeys = element.key.split("|").filter((key) => key);

        if (multipleKeys.length < 2) {
          return;
        }

        if (multipleKeys.includes(e.key)) {
          element.fn(e);
        }
        return;
      }

      if (e.key === element.key) {
        element.fn(e);
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
      keys.forEach((element) => {
        if (element.key === "|") {
          console.log(
            `Key %c${element.key}%c loaded ✅.`,
            "color: #09f",
            "color: initial"
          );
          return;
        }

        if (element.key.includes("|")) {
          const multipleKeys = element.key.split("|").filter((key) => key);

          if (multipleKeys.length < 2) {
            console.log(
              `If you use the key field with | it is to pass multiple keys with the same function. I regret to inform you that the key %c${element.key}%c was not loaded successfully ❌.`,
              "color: red",
              "color: initial"
            );
            return;
          }

          multipleKeys.forEach((key) =>
            console.log(
              `Key %c${key}%c loaded ✅.`,
              "color: #09f",
              "color: initial"
            )
          );
          return;
        }

        console.log(
          `Key %c${element.key}%c loaded ✅.`,
          "color: #09f",
          "color: initial"
        );
      });
      return;
    }

    if (debug && keys.length === 0) {
      return console.log("No keys have been added to the key Array ✅.");
    }
  }, []);
  return {};
};
