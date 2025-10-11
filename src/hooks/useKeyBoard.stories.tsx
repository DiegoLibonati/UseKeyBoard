import type { Meta, StoryObj } from "@storybook/react-vite";

import { useKeyBoard } from "@src/hooks/useKeyBoard";

const meta: Meta = {
  title: "Hooks/useKeyBoard",
};

export const UseKeyBoard: StoryObj = {
  render: () => {
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
  },
};

export default meta;
