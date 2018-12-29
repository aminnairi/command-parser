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
declare class CommandParser {
    options: Options[];
    constructor();
    option(option: string, description: string, noValueExpected?: Boolean): this;
    parse(parameters?: string[]): CommandParserOptions;
    help(): string;
}
declare const NO_VALUE_EXPECTED = true;
export { CommandParser, NO_VALUE_EXPECTED };
