# Contributing

## Find issues or features

1. Find an issue or think about a feature with the API.
1. Go to [https://github.com/aminnairi/command-parser/issues](https://github.com/aminnairi/command-parser/issues) and search for a similar issue.
1. If the issue is not found, open a new one and write a good description.
1. Submit the issue

## Fix Issues

1. Go to [https://github.com/aminnairi/command-parser/issues](https://github.com/aminnairi/command-parser/issues) and search for an issue you want to fix.
1. Login with your GitHub account.
1. Navigate to [https://github.com/aminnairi/command-parser](https://github.com/aminnairi/command-parser).
1. Click the `Fork` button in the top-right corner.
1. Note the URL to the fork (https://github.com/yourusername/command-parser where `yourusername` is your GitHub account's username).
1. Install the [Git](https://git-scm.com/) command line interface.
1. Install the [Nodejs](https://nodejs.org/en/) plateform.
1. Install the [NPM](https://www.npmjs.com/) command line interface (may be installed along side [Nodejs](https://nodejs.org/en/)).
1. Clone your fork by issueing the command `git clone https://github.com/yourusername/command-parser` (where `yourusername` is your GitHub account's username).
1. Create and checkout a branch for the issue you are trying to fix by issueing the command `git checkout -b my-fix` where `my-fix` is the name of the branch to create for fixing the issue you are working on. 
1. Install the development dependencies by issueing the command `npm install` or `npm i`.
1. Append the changes according to the issue you are trying to fix.
1. Run the tests by issueing the command `npm test`
1. Build the production files by issueing the command `npm run production`
1. Commit your changes by issueing the command `git commit -am "my commit message"` where `my commit message` is the commit message according to the changes.
1. Push your changes and create the remote branch by issueing the command `git push --set-upstream origin my-fix` where `my-fix` is the name of the branch you previously created.
1. Go to `https://github.com/yourusername/command-parser` where `yourusername` is your GitHub account's username.
1. Click the branch dropdown selector and choose `my-fix` where `my-fix` is the name of the branch your created for fixing the issue.
1. Click the `compare and pull request` button to submit your changes. Do not forget to link the issue to your pull request by typing `Fixes #N` in the description where `N` is the identifier of the issue.
