import { useKeyBoard } from "./hooks/useKeyBoard";

function App(): JSX.Element {
  useKeyBoard({
    config: {
      debug: true,
      dependencies: [],
      keys: [
        {
          key: "ArrowUp",
          fn: () => {
            console.log("Up Arrow");
          },
        },
      ],
    },
  });

  return <div>Test UseKeyBoard - Open Console</div>;
}

export default App;
