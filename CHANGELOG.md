# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2019-10-02

### Added

- [`useUndoable`](https://github.com/kripod/standard-hooks/blob/v1.3.0/src/useUndoable.ts) hook ([#30])

### Changed

- Use built-in `VisibilityState` type of TypeScript 3.7 ([#33])

## [1.2.1] - 2019-09-24

### Changed

- Make callback signature of [`useToggle`](https://github.com/kripod/standard-hooks/blob/v1.2.1/src/useToggle.ts) compatible with the example provided in the docs

### Fixed

- Type declaration of [`usePrevious`](https://github.com/kripod/standard-hooks/blob/v1.2.1/src/usePrevious.ts) hook
- Update [`useTimeline`](https://github.com/kripod/standard-hooks/blob/v1.2.1/src/useTimeline.ts)'s result when its capacity changes ([#31])
- Execute Storage API side effects properly ([#29])

## [1.2.0] - 2019-09-22

### Added

- [`usePrevious`](https://github.com/kripod/standard-hooks/blob/v1.2.0/src/usePrevious.ts) hook ([#18])
- [`useTimeline`](https://github.com/kripod/standard-hooks/blob/v1.2.0/src/useTimeline.ts) hook ([#23])

## [1.1.2] - 2019-09-19

### Fixed

- Missing `main` field from package metadata ([#25])

## [1.1.1] - 2019-09-18

### Fixed

- Package deployment mechanism

## [1.1.0] - 2019-09-18

### Added

- [`useToggle`](https://github.com/kripod/standard-hooks/blob/v1.1.0/src/useToggle.ts) hook
- [`useMedia`](https://github.com/kripod/standard-hooks/blob/v1.1.0/src/useMedia.ts) hook ([#11])
- [`usePreferredColorScheme`](https://github.com/kripod/standard-hooks/blob/v1.1.0/src/usePreferredColorScheme.ts) hook ([#12])

### Changed

- Simplify syntax of examples in JSDoc comments

### Fixed

- Missing `target` parameter in [`useEventListener`](https://github.com/kripod/standard-hooks/blob/v1.1.0/src/useEventListener.ts) example ([#2])

## [1.0.1] - 2019-09-15

### Fixed

- Package metadata (`repository` field)

## [1.0.0] - 2019-09-14

### Added

- Initial public release, featuring 15 hooks

[unreleased]: https://github.com/kripod/standard-hooks/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/kripod/standard-hooks/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/kripod/standard-hooks/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/kripod/standard-hooks/compare/v1.1.2...v1.2.0
[1.1.2]: https://github.com/kripod/standard-hooks/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/kripod/standard-hooks/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/kripod/standard-hooks/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/kripod/standard-hooks/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/kripod/standard-hooks/releases/tag/v1.0.0
[#2]: https://github.com/kripod/standard-hooks/pull/2
[#11]: https://github.com/kripod/standard-hooks/pull/11
[#12]: https://github.com/kripod/standard-hooks/pull/12
[#18]: https://github.com/kripod/standard-hooks/issues/18
[#23]: https://github.com/kripod/standard-hooks/issues/23
[#25]: https://github.com/kripod/standard-hooks/issues/25
[#29]: https://github.com/kripod/standard-hooks/issues/29
[#30]: https://github.com/kripod/standard-hooks/issues/30
[#31]: https://github.com/kripod/standard-hooks/issues/31
[#33]: https://github.com/kripod/standard-hooks/issues/33
