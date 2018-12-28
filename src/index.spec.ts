import { CommandParser, NO_VALUE_EXPECTED } from './index';
import { expect } from 'chai';
import 'mocha';

describe('Command Parser', () => {
  it('should parse double-dash non-boolean argument', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');

    const options: string = JSON.stringify(commandParser.parse([
      '--credentials',
      '/etc/openvpn/client/credentials.txt'
    ]));

    const expected: string = JSON.stringify({
      credentials: '/etc/openvpn/client/credentials.txt'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse multiple double-dash non-boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');
    commandParser.add('tunel', 'Tunel');

    const options: string = JSON.stringify(commandParser.parse([
      '--credentials',
      '/etc/openvpn/client/credentials.txt',
      '--tunel',
      '/etc/openvpn/client/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      credentials: '/etc/openvpn/client/credentials.txt',
      tunel: '/etc/openvpn/client/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse double-dash boolean argument', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '--secure'
    ]));

    const expected: string = JSON.stringify({
      secure: 'yes'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse multiple double-dash boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.add('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '--secure',
      '--tcp'
    ]));

    const expected: string = JSON.stringify({
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });
});