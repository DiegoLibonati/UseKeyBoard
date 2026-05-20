<h1 align='center'>
  UseKeyboard React
</h1>

<p align='center'>
  UseKeyboard is a lightweight, fully-typed React hook library for handling keyboard interactions declaratively. Instead of scattering <code>addEventListener</code> calls or <code>onKeyDown</code> handlers across your components, <code>useKeyboard</code> lets you define all your keyboard bindings in one configuration object. You specify which keys to listen for, what function to execute when they are pressed, and optionally restrict matches to specific modifier combinations (Ctrl, Shift, Alt, Meta). The hook supports listening on <code>keydown</code>, <code>keyup</code>, or both events simultaneously, and can be toggled on or off at runtime without unmounting. A <code>debug</code> mode logs each registered key to the console so you can verify your configuration at a glance, and <code>keysLoaded</code> is returned so you can inspect which keys are currently active. The library is zero-dependency (only React as a peer), tree-shakeable, and ships both ESM and CJS builds.
</p>

## Description

The sections below walk you from installing the package to using every feature it exposes: a minimal setup, the full API reference, and a series of progressively richer examples.

### Installation

Install the package using your preferred package manager:

#### NPM

```bash
npm install usekeyboard-react
```

#### YARN

```bash
yarn add usekeyboard-react
```

### Basic Usage

Once installed, import `useKeyboard` and declare your bindings inside the component that owns the page or view:

```jsx
import { useState } from "react";
import { useKeyboard } from "usekeyboard-react";
import "./App.css";

export const HomePage = (): JSX.Element => {
  const [count, setCount] = useState<number>(0);

  useKeyboard({
    config: {
      keys: [
        {
          key: "Enter",
          fn: () => console.log("Hi Enter"),
        },
        {
          key: "ArrowRight|ArrowLeft",
          fn: () => console.log("Hi Arrows Right and Left"),
        },
        {
          key: "a|b",
          fn: (e) => {
            if (e.key === "a") console.log("i am A");
            if (e.key === "b") console.log("i am B");
          },
        },
      ],
      dependencies: [],
      debug: true,
    },
  });

  return (
    <main>
      <h1>Home Page</h1>
      <p>{count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}></button>
    </main>
  );
};
```

Ideally, the hook should be used in the parent component of the current page being rendered. That is to say, we will call it only once based on the page we are rendering. In this case in HomePage as an example.

### API Reference

The hook accepts a single `config` object. The tables below describe every field you can pass.

#### Props

| Prop           | Description                                                                                                                                                                                                                                  | Type                             | Default     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `keys`         | The set of key bindings to register. Each entry defines the key to listen for, the function to execute, and optional modifier requirements.                                                                                                  | `KeyConfig[]`                    | -           |
| `dependencies` | Controls when React recreates the internal `onKeyPress` callback via `useCallback`. Pass any values referenced inside your `fn` callbacks that can change between renders. If none of the values change, React reuses the memoized callback. | `React.DependencyList`           | -           |
| `debug`        | When `true`, logs each registered key to the console on mount so you can verify your configuration.                                                                                                                                          | `boolean`                        | `false`     |
| `enabled`      | When `false`, no event listeners are attached and no keyboard events are handled. Useful for conditionally disabling keyboard shortcuts without unmounting the component.                                                                    | `boolean`                        | `true`      |
| `trigger`      | Which DOM event type to listen on. `"keydown"` fires while the key is held, `"keyup"` fires on release, `"both"` registers listeners for both events.                                                                                        | `"keydown" \| "keyup" \| "both"` | `"keydown"` |

#### KeyConfig

Each item in the `keys` array accepts the following fields:

| Field       | Description                                                                                                                        | Type                         | Required |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | -------- |
| `key`       | The key identifier to match (e.g. `"Enter"`, `"ArrowDown"`). Use `"\|"` as a separator to bind multiple keys to the same function. | `string`                     | ✓        |
| `fn`        | The function to execute when the key is matched. Receives the native `KeyboardEvent`.                                              | `(e: KeyboardEvent) => void` | ✓        |
| `modifiers` | Optional modifier keys that must be active for the binding to fire.                                                                | `KeyModifiers`               |          |

#### KeyModifiers

| Field   | Description                                             | Type      |
| ------- | ------------------------------------------------------- | --------- |
| `ctrl`  | Requires Ctrl to be held (`true`) or not (`false`).     | `boolean` |
| `shift` | Requires Shift to be held (`true`) or not (`false`).    | `boolean` |
| `alt`   | Requires Alt to be held (`true`) or not (`false`).      | `boolean` |
| `meta`  | Requires Meta/Cmd to be held (`true`) or not (`false`). | `boolean` |

Example if debug prop is in true:

![debug-true](./public/loaded.png)

### Examples

With the API in mind, the following recipes show how to combine those fields for common keyboard-handling patterns.

#### Multiple Keys with the same Function

If you want to declare 2 or more keys that have the same function to be executed you can use the string `"|"`.

In this case the keys 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9 will execute the command in console: Hi, im a number.

```jsx
import { useKeyboard } from "usekeyboard-react";
import "./App.css";

export const HomePage = (): JSX.Element => {
  useKeyboard({
    config: {
      keys: [
        {
          key: "0|1|2|3|4|5|6|7|8|9",
          fn: () => console.log("Hi, im a number"),
        },
      ],
      dependencies: [],
      debug: true,
    },
  });

  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
};
```

#### Using Modifier Keys

You can require one or more modifier keys to be held for a binding to fire using the `modifiers` field on each key entry.

```jsx
import { useKeyboard } from "usekeyboard-react";

export const HomePage = (): JSX.Element => {
  useKeyboard({
    config: {
      keys: [
        {
          key: "s",
          modifiers: { ctrl: true },
          fn: () => console.log("Ctrl+S pressed — saving"),
        },
        {
          key: "z",
          modifiers: { ctrl: true, shift: true },
          fn: () => console.log("Ctrl+Shift+Z pressed — redo"),
        },
        {
          key: "k",
          modifiers: { meta: true },
          fn: () => console.log("Cmd+K pressed"),
        },
      ],
      dependencies: [],
      debug: true,
    },
  });

  return <main><h1>Home Page</h1></main>;
};
```

#### Controlling the Trigger Event

By default the hook listens on `keydown`. Use `trigger` to change this behaviour.

```jsx
import { useKeyboard } from "usekeyboard-react";

export const HomePage = (): JSX.Element => {
  useKeyboard({
    config: {
      keys: [{ key: "Enter", fn: () => console.log("Enter released") }],
      dependencies: [],
      trigger: "keyup",
    },
  });

  return <main><h1>Home Page</h1></main>;
};
```

#### Toggling the Hook at Runtime

Use the `enabled` prop to enable or disable all keyboard listeners without unmounting the component.

```jsx
import { useState } from "react";
import { useKeyboard } from "usekeyboard-react";

export const HomePage = (): JSX.Element => {
  const [active, setActive] = useState(true);

  useKeyboard({
    config: {
      keys: [{ key: "ArrowUp", fn: () => console.log("Up!") }],
      dependencies: [],
      enabled: active,
    },
  });

  return (
    <main>
      <h1>Home Page</h1>
      <button onClick={() => setActive((v) => !v)}>
        {active ? "Disable" : "Enable"} shortcuts
      </button>
    </main>
  );
};
```

#### Using the keyboard event (KeyboardEvent)

We can also pass inside our execution function the `keydown` event.

`e` refers to Javascript's `KeyboardEvent`.

```jsx
import { useKeyboard } from "usekeyboard-react";
import "./App.css";

export const HomePage = (): JSX.Element => {
  useKeyboard({
    config: {
      keys: [
        {
          key: "a|b",
          fn: (e) => {
            if (e.key === "a") console.log("i am A");
            if (e.key === "b") console.log("i am B");
          },
        },
      ],
      dependencies: [],
      debug: true,
    },
  });

  return (
    <main>
      <h1>Home Page</h1>
    </main>
  );
};
```

#### Another Example

Here we are creating actions for when the up, down, right, left, and enter keys on the keyboard are pressed. For each assigned key, a function to execute is assigned for that specific key. Additionally, in the dependencies array, the dependencies for channels and focusedIndex are passed so that the functions inside the keys are updated based on the current state of both dependencies. Finally, debug is set to True so that development messages appear in the console to see information about our hook.

```jsx
import { useState } from "react";
import { useKeyboard } from "usekeyboard-react";

const [focusedIndex, setFocusedIndex] = useState<number>(0);
useKeyboard({
    config: {
        keys: [
        {
            key: "ArrowRight",
            fn: () => {
                setFocusedIndex((prevIndex) =>
                    prevIndex === channels?.length! - 1 ? 0 : prevIndex + 1
                );
                return;
            },
        },
        {
            key: "ArrowLeft",
            fn: () => {
                setFocusedIndex((prevIndex) =>
                    prevIndex === 0 ? channels?.length! - 1 : prevIndex - 1
                );
                return;
            },
        },

        {
            key: "ArrowUp",
            fn: () => {
                setFocusedIndex((prevIndex) =>
                    prevIndex === 0 || prevIndex === 1 || prevIndex === 2
                    ? channels?.length! - 1
                    : prevIndex - 1
                );
                return;
            },
        },
        {
            key: "ArrowDown",
            fn: () => {
                setFocusedIndex((prevIndex) =>
                    prevIndex === channels?.length! - 1 ||
                    prevIndex === channels?.length! - 2 ||
                    prevIndex === channels?.length! - 3
                    ? 0
                    : prevIndex + 1
                );
            },
        },
        {
            key: "Enter",
            fn: () => {
                handleSetChannel(channels![focusedIndex]);
                handleNavigateTo("/tv");
                return;
            },
        },
        ],
        dependencies: [focusedIndex, channels],
        debug: true,
    },
});
```

#### Best practices or Other uses

You are free to create new best practices, choose your own style, or put your own touch on it. You are free.

For better usage, we can create a variable that contains our array of keys, saving space in the code. For example:

```jsx
const KEYS = [
  {
    key: "ArrowDown",
    fn: () => console.log("ArrowDown Pressed"),
  },
  {
    key: "Enter",
    fn: () => console.log("Enter Pressed"),
  },
];

useKeyboard({
  config: {
    keys: KEYS,
    dependencies: [],
    debug: true,
  },
});
```

Another example:

```jsx
const handlePressArrowDown = (): void => {
  console.log("ArrowDown Pressed");
};

const KEYS = [
  {
    key: "ArrowDown",
    fn: () => handlePressArrowDown(),
  },
  {
    key: "Enter",
    fn: () => console.log("Enter Pressed"),
  },
];

useKeyboard({
  config: {
    keys: KEYS,
    dependencies: [],
    debug: true,
  },
});
```

## Getting Started

If you want to develop or collaborate with this project, please follow point by point:

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run storybook` to explore the example component, helper and hook

The Storybook playground will be available at `http://localhost:6006`

## Testing

With the project running locally, you can verify the hook's behaviour against the test suite:

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch. On `push` to `main`, the same workflow continues with an additional job that produces an automated npm release.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│     testing      │─▶│      build       │
│ eslint · tsc · audit │  │  jest (jsdom)    │  │   vite build     │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
                                                          │
                                       (only on push to main, sequentially)
                                                          ▼
                                                ┌──────────────────────┐
                                                │       release        │
                                                │ semantic-release → npm│
                                                └──────────────────────┘
```

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — `npm run lint` (ESLint), `npm run type-check` (`tsc --noEmit` against `tsconfig.app.json`) and `npm audit --omit=dev --audit-level=high` on production dependencies.
2. **`testing`** — runs `npm run test:ci` (Jest with `jest-environment-jsdom`).
3. **`build`** — produces the library bundles (ESM + CJS + `dist/types`) via `vite build`.

### Release job (only on push to `main`)

4. **`release`** — runs `npx semantic-release` using [`.releaserc.json`](.releaserc.json). It inspects commits since the latest tag, decides the next SemVer version using [Conventional Commits](#conventional-commits-required-for-releases), generates the changelog section into [`CHANGELOG.md`](CHANGELOG.md), updates `package.json` and `package-lock.json`, commits and tags back to `main` as `chore(release): vX.Y.Z [skip ci]`, publishes the package to npm and creates the matching GitHub Release. The job is gated on `secrets.NPM_TOKEN`: if the token is missing, it logs a warning and exits cleanly instead of failing.

### Conventional Commits (required for releases)

Commits merged into `main` must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) so the pipeline can compute the next version and group the changelog entries.

| Commit prefix                                                               | Version bump | Example                          |
| --------------------------------------------------------------------------- | ------------ | -------------------------------- |
| `feat:` / `feat(scope):`                                                    | **MINOR**    | `feat(hook): add trigger option` |
| `fix:` / `fix(scope):`                                                      | **PATCH**    | `fix: prevent listener leak`     |
| `perf:`, `refactor:`, `docs:`, `build:`, `ci:`, `chore:`, `style:`, `test:` | **PATCH**    | `refactor: extract key parser`   |
| `feat!:` / `fix!:` or `BREAKING CHANGE:` in the body                        | **MAJOR**    | `feat!: rename useKeyboard API`  |

When a push contains multiple commits, the highest applicable bump wins (a single `feat:` among many `fix:` triggers a MINOR bump). If you squash-merge PRs, configure the repo to use the PR title as the squash commit message and write the **PR title** following the convention.

### Skipping a release

If you need to push a change to `main` without producing a release (e.g. tweaking job names in the workflow, fixing a typo in the README), append `[skip release]` to the commit message. The validation jobs (lint, test, build) still run; only the `release` job is skipped.

```bash
git commit -m "ci: rename build job for clarity [skip release]"
```

To skip **everything** including validation, use GitHub's standard `[skip ci]` marker instead.

### Where the build outputs live

| Output                        | Location                                                                          |
| ----------------------------- | --------------------------------------------------------------------------------- |
| Validation logs (lint, tests) | **Actions** tab on GitHub                                                         |
| Library bundles (`dist/`)     | Ephemeral on the runner; shipped to npm by the `release` job                      |
| Published package per version | **npm** at [`usekeyboard-react`](https://www.npmjs.com/package/usekeyboard-react) |
| Version history & notes       | [`CHANGELOG.md`](CHANGELOG.md) + the **Releases** page                            |

> **Note:** GitHub's **Packages** section is for package registries other than the public npm registry (Docker, GitHub-hosted npm scopes, etc.). The `usekeyboard-react` package is published to the **public npm registry** and lives under [npmjs.com](https://www.npmjs.com/package/usekeyboard-react).

### Repository setup required for releases

For the release job to push tags and commits back to `main` and publish to npm, the repository needs:

1. **Settings → Actions → General → Workflow permissions**: set to _Read and write permissions_.
2. **Settings → Secrets and variables → Actions**: add `NPM_TOKEN` (an automation token from npm with publish rights for `usekeyboard-react`). Without it, the `release` job exits cleanly with a warning.
3. **Branch protection on `main`**: if enabled, allow the `github-actions[bot]` to bypass the PR requirement, or disable the protection for the bot. Otherwise the release commit (`chore(release): vX.Y.Z [skip ci]`) will fail to push.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check
npm audit --omit=dev --audit-level=high

# testing
npm run test:ci

# build
npm run build
```

## Security Audit

Beyond the test suite, you should also check the dependency tree for known vulnerabilities before publishing or pulling updates.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

- `brace-expansion` moderate advisory ([GHSA-jxxr-4gwj-5jf2](https://github.com/advisories/GHSA-jxxr-4gwj-5jf2)) — surfaced by `npm audit` as a transitive devDependency (shrinkwrapped inside the `npm` CLI, pulled in by `@semantic-release/npm`). It is **not bundled** into the published library tarball, and CI runs `npm audit --omit=dev --audit-level=high`, so this moderate finding does not fail the pipeline. It will clear automatically once the npm CLI team releases a patched version — the caret range in `@semantic-release/npm` will pick it up on the next `npm update`, with no action required from the `semantic-release` maintainers ([semantic-release#4132](https://github.com/semantic-release/semantic-release/issues/4132)).

## Portfolio link

[`https://www.diegolibonati.com.ar/#/project/use-keyboard`](https://www.diegolibonati.com.ar/#/project/use-keyboard)

### Npm package link

[`https://www.npmjs.com/package/usekeyboard-react`](https://www.npmjs.com/package/usekeyboard-react)
