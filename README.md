# command-parser

Command Line Arguments Parser

```console
user@host:~/my-cli$ node index.js --existing ~/my-project --editor /usr/bin/code
```

```javascript
// index.js
'use strict';

import { CommandParser } from 'command-parser';

const parser = new CommandParser();

parser.option('create', 'Folder where to create the new project');
parser.option('existing', 'Folder where an existing project exists');
parser.option('editor', 'Editor to use to open the project');

console.log(parser.parse());

// { existing: '~/my-project/', editor: '/usr/bin/code' }
```

## Development

### Requirements

- [Git](https://git-scm.com/)
- [Nodejs](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

### Repository Installation

#### HTTPS

```console
user@host:~$ git clone https://github.com/aminnairi/command-parser.git
user@host:~$ cd command-parser
user@host:~/command-parser$ 
```

#### SSH

```console
user@host:~$ git clone git@github.com:aminnairi/command-parser.git
user@host:~$ cd command-parser
user@host:~/command-parser$ 
```

### Packages Installation

```console
user@host:~/command-parser$ npm install
```

### Build

#### Development

```console
user@host:~/command-parser$ npm run development
```

#### Production

```console
user@host:~/command-parser$ npm run production
```

### Testing

```console
user@host:~/command-parser$ npm test
```