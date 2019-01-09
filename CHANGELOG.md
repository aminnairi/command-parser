**0.5.0**
- New production build for the `index.js` file.
- Fixed tests that were in conflicts after adding the new name feature in the help display.
- Now displaying the name in the help command & method.
- Updated the help output in the documentation.

**0.4.2**
- Fixed the link to the coveralls report being set on branch development instead of master in the documentation.
- Added a link to the Travis CI report for the Travis CI badge in the documentation.

**0.4.1**
- Added Travis CI logo in the corresponding badge.

**0.4.0**
- Now redirecting to the master branch for the Coveralls badge.
- Added more NPM logos on badge whenever possible.
- It is now possible to add a synopsis for the command that will be displayed in the help message.
- Updated the unit testings constructors to match the new synopsis option.
- Fixed failed tests for the help method.
- Added tests for the constructor synopsis guard.
- Added usage example about the instanciation of the parser with the added options.
- Fixed typos in the documentation.

**0.3.0**
- Added a method to display the version and name of the command.
- Speeded up the internal short naming assignation algorithm to not search for a upper case short name if the lower case is already available.
- Fixed a mismatch configuration between the Master and Development branches.
- Added a badge for showing all the dependencies of the NPM package in the documentation.
- Added a badge for showing the vulnerabilities of the NPM package in the documentation.
- Remove the badge for showing the total NPM downloads in the documentation.
- Added a guard to prevent using "help" & "version" as an option name.
- Added the necessary unit testing cases for the help/version option name guard.
- More TypeScript type checking on the unit testing file.

**0.2.0**
- Automatic command letter assignation for commands meaning that a command with the same letter will take the lower/upper case whether it is available or will be assigned the long syntax only.
- Added tests for the automatic command letter assignation.
- Advantages is now an unordered list.
- Added TypeScript advantage.
- Added a hint in the documentation triggered by the help() method or the `--help` & `-h` arguments when the argument accept a value.
- Updated units tests to expect the new help output.
- Updated the documentation about the help method (according to the previous changes).
- Enabled Travis CI + badge

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