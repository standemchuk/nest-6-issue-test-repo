import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

import * as config from 'config';
import {IConfig} from 'config';

export const isLocal = () => {
  const host = config.get('server.host');
  return host === 'localhost' || host === '127.0.0.1';
};

export const getHost = () => {
  const hostname = config.get('server.hostname');
  if (hostname) {
    return `${hostname}`;
  } else {
    return `${config.get('server.host')}:${config.get('server.port')}`;
  }
};

export const getPort = (): string => {
  return `${config.get('server.port')}`;
};

export const getConfig = () => {
  return config;
};

export const configProviders = [
  {
    provide: 'configService',
    useFactory: (): IConfig => config,
  },
  {
    provide: 'hostName',
    useFactory: (): string => getHost(),
  },
];
