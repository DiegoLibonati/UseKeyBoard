import { Meta } from "@storybook/react";

import { useKeyBoard } from "@src/hooks/useKeyBoard";

const meta: Meta = {
  title: "Hooks/useKeyBoard",
};

export default meta;

export const UseKeyBoard = () => {
  const config = {
    keys: [
      { key: "w", fn: () => alert("Key W pressed!") },
      { key: "q", fn: () => alert("Key Q pressed!") },
      { key: "a|b", fn: () => console.log("Key A or B pressed!") },
    ],
    dependencies: [],
    debug: true,
  };

  useKeyBoard({ config });

  return (
    <div>
      <p>Press "A" or "B" to trigger the corresponding actions.</p>
    </div>
  );
};
