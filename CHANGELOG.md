# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.1](https://github.com/AuthApex/authapex-core/compare/v0.2.0...v0.2.1) (2025-10-03)


### Features

* add `getUserData` method to `UserService` and introduce `SimpleUser` model ([3eb0320](https://github.com/AuthApex/authapex-core/commit/3eb03205ed67c166c87e8b671484b160ed25248a))
* integrate `date-fns` for cache expiration in `UserService` and enhance caching mechanisms ([1b6a508](https://github.com/AuthApex/authapex-core/commit/1b6a508fc0164d2d8dce0af985feadf5257a1672))

## [0.2.0](https://github.com/AuthApex/authapex-core/compare/v0.1.3...v0.2.0) (2025-10-03)


### Features

* add `UserService` for user cache management and export in index ([c57e61a](https://github.com/AuthApex/authapex-core/commit/c57e61a3ce2c0ec8ec9f651ad6f1a90c2bec008b))
* export WebSocket models and remove unused `AuthorizeTokenResponse` interface ([94ac8f1](https://github.com/AuthApex/authapex-core/commit/94ac8f185c6dd8e0da7d4b6561c5fa76640fec1d))
* introduce WebSocket event interfaces for user updates and deletions ([3bea8bb](https://github.com/AuthApex/authapex-core/commit/3bea8bbe06ce5bb37a99d4f9026f0cc603d7b721))
* simplify `AuthorizationService` by merging methods and removing unused APIs ([be4b4fb](https://github.com/AuthApex/authapex-core/commit/be4b4fb992811eed2c29f89cf0396e0ac8db1147))


### Bug Fixes

* update axios peer dependency to ^1.12.0 ([25a51ca](https://github.com/AuthApex/authapex-core/commit/25a51ca44d5dc1c1dd7bfaa5d58a63147a24597d))

### [0.1.3](https://github.com/AuthApex/authapex-core/compare/v0.1.2...v0.1.3) (2025-08-22)


### Bug Fixes

* handle invalid input in `decodeAuthorizeData` method ([eb9329a](https://github.com/AuthApex/authapex-core/commit/eb9329a4022862cb609f4fc8d4ef90c9f2e099c4))

### [0.1.2](https://github.com/AuthApex/authapex-core/compare/v0.1.1...v0.1.2) (2025-08-22)


### Features

* add `logout` method to AuthorizationService ([d150d2a](https://github.com/AuthApex/authapex-core/commit/d150d2a37605ac5681b88b0457042f49b7cc0ed2))

### 0.1.0 (2025-08-22)

### Features
* Initialize project
