'use strict';

interface Options {
  description: string;
  long: string;
  name: string;
  noValueExpected: Boolean;
  short: string | undefined;
}

interface CommandParserOptions {
  [key: string]: string;
}

class CommandParser {
  private options: Options[];

  constructor() {
    this.options = [
      {
        description: 'Display this message',
        long: '--help',
        name: 'help',
        noValueExpected: true,
        short: '-h'
      }
    ];
  }

  option(
    option: string,
    description: string,
    noValueExpected: Boolean = false
  ): this {
    let short: string | undefined = `-${option[0]}`;

    for (const option of this.options) {
      if (option.short === short) {
        short = undefined;
      }
    }

    this.options.push({
      description,
      long: `--${option}`,
      name: option,
      noValueExpected,
      short
    });

    return this;
  }

  parse(parameters: string[] = process.argv.slice(2)): CommandParserOptions {
    const provided: CommandParserOptions = {};

    for (let index = 0; index < parameters.length; index++) {
      const parameter = parameters[index];

      if (parameter === '--help' || parameter === '-h') {
        console.log(this.help());

        process.exit(0);
      }

      if (
        parameter.startsWith('-') &&
        parameter[1] !== '-' &&
        parameter.length > 2
      ) {
        const multiParameters = parameter.slice(1).split('');
        const count = multiParameters.length;

        parameters.splice(index, 1);

        for (let position = count - 1; position >= 0; position--) {
          parameters.splice(index, 0, `-${multiParameters[position]}`);
        }

        index--;

        continue;
      }

      let found = false;

      for (const option of this.options) {
        if (parameter === option.long || parameter === option.short) {
          if (option.noValueExpected === NO_VALUE_EXPECTED) {
            provided[option.name] = 'yes';
            found = true;
            break;
          } else {
            const next = parameters[index + 1];

            if (next) {
              provided[option.name] = next;
              index += 1;
              found = true;
              break;
            }
          }
        }
      }

      if (!found) {
        if ('argument' in provided) {
          provided['argument'] += ` ${parameter}`;
        } else {
          provided['argument'] = parameter;
        }
      }
    }

    return provided;
  }

  help(): string {
    let string = 'OPTIONS';

    for (const option of this.options) {
      string += '\n\n    ';

      if (option.short) {
        string += `${option.short}, ${option.long}`;
      } else {
        string += `${option.long}`;
      }

      string += `\n        ${option.description}`;
    }

    return string;
  }
}

const NO_VALUE_EXPECTED = true;

export { CommandParser, NO_VALUE_EXPECTED };
