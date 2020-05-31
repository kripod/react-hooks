# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.1](https://github.com/kripod/react-hooks/compare/web-api-hooks@3.0.0...web-api-hooks@3.0.1) (2020-03-30)

### Bug Fixes

- bundle NetworkInformation properly ([2839251](https://github.com/kripod/react-hooks/commit/2839251e37ae6165bb3def0fea2d8f702cb86b86))

# [3.0.0](https://github.com/kripod/react-hooks/compare/web-api-hooks@2.2.2...web-api-hooks@3.0.0) (2020-03-30)

### Bug Fixes

- importing NetworkInformation types ([54445f4](https://github.com/kripod/react-hooks/commit/54445f4a9da95854156de9338f7c39a0378f71c6))

## [2.2.2](https://github.com/kripod/react-hooks/compare/web-api-hooks@2.2.1...web-api-hooks@2.2.2) (2019-10-26)

**Note:** Version bump only for package web-api-hooks

## [2.2.1](https://github.com/kripod/react-hooks/compare/web-api-hooks@2.2.0...web-api-hooks@2.2.1) (2019-10-25)

### Bug Fixes

- **useSize:** possible ReferenceError caused by accessing ResizeObserver ([b708153](https://github.com/kripod/react-hooks/commit/b708153b3347ecf1c08c71f841be6e432669c7ff))

# [2.2.0](https://github.com/kripod/react-hooks/compare/web-api-hooks@2.1.0...web-api-hooks@2.2.0) (2019-10-25)

### Bug Fixes

- **useMedia:** handle query param changes immediately ([ccedf58](https://github.com/kripod/react-hooks/commit/ccedf58726b89ce962d80cb2ebbf0c2bbc218e3d))
- **useMedia:** server-side rendering behavior ([0b7de89](https://github.com/kripod/react-hooks/commit/0b7de8941f33efa2f8ea409b72f5f19f57643f67)), closes [#114](https://github.com/kripod/react-hooks/issues/114)
- **useSize:** make observer work without override ([b5884d8](https://github.com/kripod/react-hooks/commit/b5884d8af0a69da7f5509c1103fe422a294ebc07))

### Features

- add useFocus sensor ([026f04c](https://github.com/kripod/react-hooks/commit/026f04cb00e2e8fd143b3c2c8ff6b44f8c6747e5))
- add useHover sensor ([888a5cb](https://github.com/kripod/react-hooks/commit/888a5cb4b27a1472284cc6eb2a2266b60e00c72a))
- add useSize for observing the dimensions of an element ([bb74f0b](https://github.com/kripod/react-hooks/commit/bb74f0bbd6404e7d654f62f2b887403ccaf16afa))

# [2.1.0](https://github.com/kripod/react-hooks/compare/web-api-hooks@2.0.1...web-api-hooks@2.1.0) (2019-10-24)

### Features

- add usePreferredMotionIntensity ([eaed758](https://github.com/kripod/react-hooks/commit/eaed758a41a7a84e2c906782ff255ddb57fe4234))

## [2.0.1](https://github.com/kripod/react-hooks/compare/web-api-hooks@2.0.0...web-api-hooks@2.0.1) (2019-10-16)

### Bug Fixes

- **useMedia:** improve compatibility by using deprecated listener syntax ([8f76bab](https://github.com/kripod/react-hooks/commit/8f76bab19efce5f5ef377451d2df737973787186)), closes [#91](https://github.com/kripod/react-hooks/issues/91)

# 2.0.0 (2019-10-13)

### Features

- **useUndoable:** add `jump` method to apply multiple deltas at once ([29c6ed7](https://github.com/kripod/react-hooks/commit/29c6ed719111af75849de4448589669e937f7f73)), closes [#59](https://github.com/kripod/react-hooks/issues/59)

### BREAKING CHANGES

- **useUndoable:** return state hook result extensions as an object ([0e352a9](https://github.com/kripod/react-hooks/commit/0e352a9aa598f864508afafbc2e293b9d32d9f33))
- **useToggle:** repurpose as a wrapper hook ([#78](https://github.com/kripod/react-hooks/pull/78)) ([269fb49](https://github.com/kripod/react-hooks/commit/269fb492ff7ea0804e0ebe07b7050aa0ebf2b377)), closes [#36](https://github.com/kripod/react-hooks/issues/36)
