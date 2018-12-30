interface ICommandParserOptions {
    [key: string]: string;
}
declare class CommandParser {
    private options;
    constructor();
    option(name: string, description: string, noValueExpected?: boolean): this;
    parse(parameters?: string[]): ICommandParserOptions;
    help(): string;
}
declare const NO_VALUE_EXPECTED: boolean;
export { CommandParser, NO_VALUE_EXPECTED };
