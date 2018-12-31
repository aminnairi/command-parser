**0.1.1**
- Automatic command letter assignation for commands meaning that a command with the same letter will take the lower/upper case whether it is available or will be assigned the long syntax only.
- Added tests for the automatic command letter assignation.
- Advantages is now an unordered list.
- Added TypeScript advantage.
- Added a hint in the documentation triggered by the help() method or the `--help` & `-h` arguments when the argument accept a value.
- Updated units tests to expect the new help output.
- Updated the documentation about the help method (according to the previous changes).

**0.1.0**
- Added download counter badge in the documentation.
- Added shields logos whenever possible.
- Added shields for the NPM package latest version.
- Added relevant links for the badges.
- Added a changelog file.
- Reduced the size of the NPM package tarball by whitelisting only the necessary files.
- Added a link to the contribution file in the documentation.
- Re-thinked the installation steps.
- Added usage examples in the documentation.
- Added advantages in the documentation.
- Linked back to the official NPM documentation for all references in the documentation.
- Fixed various line return issue for the steps title in the documentation.
- Fixed syntax highlighting.
- Removed unecessary script for stryker in the `package.json` file.
- Added coverage badge.
- Added TypeScript linting.
- Exported the interface for the parser options.
- Added instructions on how to use the API with TypeScript in the documentation.
- Fixed typos.
- Added NPM environment-agnostic script.
- Implemented the double-dash-equal syntax.

**0.0.4**
- Added MIT license file.
- Added license + issue badges.
- Added contribution guidelines.
- Added bug report template.
- Added pull request template.
- Added feature request template.
- Added the contributior's covenant file.

**0.0.3**
- Fix an issue where webpack was not building the proper node format for the script to be require properly.
- Added instructions for installing the project.
- Added more TypeScript type hinting.
- Added code coverage.
- Added runtime type checkings.

**0.0.2**
- Changed package name to its scoped version for publishing

**0.0.1**
- Added TypeScript return type for all methods.
- Prettified the main script.
- Added TypeScript type checking.
- The `CommandParser.option()` now returns the current instance to chain others `CommandParser.option()` calls.
- Added most of the unit tests.
- Added the possibility to gather the non-arguments (a.k.a final parameters).
- Added TypeScript definition file.


**0.0.0**
- Initial release.