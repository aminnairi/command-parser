export interface ICommandParserOptions {
    [key: string]: string;
}
export declare class CommandParser {
    private options;
    constructor();
    option(name: string, description: string, noValueExpected?: boolean): this;
    parse(parameters?: string[]): ICommandParserOptions;
    help(): string;
}
export declare const NO_VALUE_EXPECTED: boolean;
