import { CommandParser, NO_VALUE_EXPECTED } from './index';
import { expect } from 'chai';
import 'mocha';

describe('Command Parser', () => {
  it('should parse double-dash non-boolean arguments', () => {
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

  it('should parse double-dash non-boolean arguments with unforseen argument', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');
    commandParser.add('tunel', 'Tunel');

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '--credentials',
      '/etc/openvpn/client/credentials.txt',
      '--tunel',
      '/etc/openvpn/client/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      credentials: '/etc/openvpn/client/credentials.txt',
      tunel: '/etc/openvpn/client/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse double-dash boolean arguments', () => {
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

  it('should parse double-dash boolean arguments with unforseen argument', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.add('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/config.ovpn',
      '--secure',
      '--tcp'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/config.ovpn',
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });
});