import { CommandParser, NO_VALUE_EXPECTED } from './index';
import { expect } from 'chai';
import 'mocha';

describe('Command Parser', () => {
  it('should parse double-dash non-boolean arguments', () => {
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

  it('should parse single-dash non-boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');
    commandParser.add('tunel', 'Tunel');

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-c',
      '/etc/openvpn/client/credentials.txt',
      '-t',
      '/etc/openvpn/client/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      credentials: '/etc/openvpn/client/credentials.txt',
      tunel: '/etc/openvpn/client/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.add('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-s',
      '-t'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash single-token boolean arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.add('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-st',
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse single-dash single-token mixed arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');
    commandParser.add('passthrough', 'Tunel to use');
    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.add('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-stc',
      '/etc/openvpn/cilent/credentials.txt',
      '-p',
      '/etc/openvpn/cilent/config.ovpn'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes',
      credentials: '/etc/openvpn/cilent/credentials.txt',
      passthrough: '/etc/openvpn/cilent/config.ovpn'
    });

    expect(options).to.be.equal(expected);
  });

  it('should parse mixed-dash mixed-token mixed arguments', () => {
    const commandParser: CommandParser = new CommandParser();

    commandParser.add('credentials', 'Credentials');
    commandParser.add('passthrough', 'Tunel to use');
    commandParser.add('user', 'User to substitue to');
    commandParser.add('secure', 'Secure the VPN tunnel', NO_VALUE_EXPECTED);
    commandParser.add('tcp', 'Use TCP protocol', NO_VALUE_EXPECTED);

    const options: string = JSON.stringify(commandParser.parse([
      '/etc/openvpn/client/openvpn.conf',
      '-stc',
      '/etc/openvpn/cilent/credentials.txt',
      '-p',
      '/etc/openvpn/cilent/config.ovpn',
      '--user',
      'arch'
    ]));

    const expected: string = JSON.stringify({
      argument: '/etc/openvpn/client/openvpn.conf',
      secure: 'yes',
      tcp: 'yes',
      credentials: '/etc/openvpn/cilent/credentials.txt',
      passthrough: '/etc/openvpn/cilent/config.ovpn',
      user: 'arch'
    });

    expect(options).to.be.equal(expected);
  });
});