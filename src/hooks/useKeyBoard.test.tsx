import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { useKeyBoard, UseKeyBoardProps } from "./useKeyBoard";

interface UseKeyBoardTestComponentProps {
  config: UseKeyBoardProps["config"];
}

const fnKeyA = jest.fn();
const fnKeyP = jest.fn();
const fnKeyArrows = jest.fn();
const fnKey0 = jest.fn();
const fnKey1 = jest.fn();

const keys: UseKeyBoardProps["config"]["keys"] = [
  { key: "a", fn: fnKeyA },
  {
    key: "0|1",
    fn: (e) => {
      const key = e.key;
      if (key === "0") return fnKey0();
      if (key === "1") return fnKey1();
    },
  },
  {
    key: "p|",
    fn: fnKeyP,
  },
  {
    key: "ArrowRight|ArrowLeft",
    fn: fnKeyArrows,
  },
];
const config: UseKeyBoardProps["config"] = {
  keys: keys,
  dependencies: [],
  debug: false,
};

const UseKeyBoardTestComponent = ({
  config,
}: UseKeyBoardTestComponentProps): JSX.Element => {
  useKeyBoard({ config: config });

  return <div>Test</div>;
};

test("It must register a key on the keyboard and execute the relevant function of that key when the key is pressed.", async () => {
  render(<UseKeyBoardTestComponent config={config}></UseKeyBoardTestComponent>);

  await user.keyboard("a");

  expect(fnKeyA).toHaveBeenCalledTimes(1);
});

test("It must record the keys of the arrows equally. Also, pressing both keys separately should perform the same function.", async () => {
  render(<UseKeyBoardTestComponent config={config}></UseKeyBoardTestComponent>);

  await user.keyboard("[ArrowLeft]");

  expect(fnKeyArrows).toHaveBeenCalledTimes(1);

  await user.keyboard("[ArrowRight]");

  expect(fnKeyArrows).toHaveBeenCalledTimes(2);
});

test("It must register the keys for the numbers 0 and 1 equally. In addition, pressing each key separately will execute the relevant function of each number.", async () => {
  render(<UseKeyBoardTestComponent config={config}></UseKeyBoardTestComponent>);

  await user.keyboard("0");

  expect(fnKey0).toHaveBeenCalledTimes(1);

  await user.keyboard("1");

  expect(fnKey1).toHaveBeenCalledTimes(1);
});

test("It should not register keys if multiple keys are passed in the same record but only one key is passed.", async () => {
  render(<UseKeyBoardTestComponent config={config}></UseKeyBoardTestComponent>);

  await user.keyboard("p");

  expect(fnKeyP).toHaveBeenCalledTimes(0);
});
