import {
  SERVER_LOGS_COLOR,
  EXPRESS_PORT,
  YELLOW_SERVER_LOGS_COLOR,
} from '../electron/constants';

import * as mdns from 'mdns';

class MdnsManager {
  tcp: any;
  ad: any;
  discoverdServices: {
    [key: string]: boolean;
  };
  browser: mdns.Browser | null;

  constructor() {
    console.log(SERVER_LOGS_COLOR, 'init mdns manager');

    this.tcp = mdns.tcp('http');

    try {
      this.ad = mdns.createAdvertisement(mdns.tcp('http'), EXPRESS_PORT, {
        name: 'electron-service',
      });
    } catch (error) {
      console.log(SERVER_LOGS_COLOR, error);
    }

    this.discoverdServices = {};
    this.browser = null;
  }

  start() {
    console.log(YELLOW_SERVER_LOGS_COLOR, 'start mdns manager');

    this.ad.start();
    this.runWatcher();
  }

  runWatcher() {
    const sequence = [
      mdns.rst.DNSServiceResolve(),
      'DNSServiceGetAddrInfo' in mdns.dns_sd
        ? mdns.rst.DNSServiceGetAddrInfo()
        : mdns.rst.getaddrinfo({ families: [4] }),
      mdns.rst.makeAddressesUnique(),
    ];

    try {
      this.browser = mdns.createBrowser(this.tcp, {
        resolverSequence: sequence,
      });

      this.browser.on('serviceUp', (service) => {
        console.log(SERVER_LOGS_COLOR, 'service up: ', service.name);
        this.addToDiscoverdServices(service);
      });

      this.browser.on('serviceDown', (service) => {
        console.log(SERVER_LOGS_COLOR, 'service down: ', service.name);
        this.removeFromDiscoverdServices(service);
      });

      this.browser.on('error', (error: any) => {
        console.log(YELLOW_SERVER_LOGS_COLOR, 'error: ', error);
      });

      this.browser.start();
    } catch (error) {
      console.log(YELLOW_SERVER_LOGS_COLOR, error);
    }

    process.on('exit', () => {
      console.log(SERVER_LOGS_COLOR, 'initiate mdns manager cleaner');
      this.cleanUp();
    });
  }

  findAllServices() {
    return mdns.browseThemAll({});
  }

  checkServiceExistence(deviceId: string) {
    return this.discoverdServices[deviceId];
  }

  addToDiscoverdServices(service: { [key: string]: any }) {
    if (service?.txtRecord?.deviceId) {
      this.discoverdServices[service?.txtRecord?.deviceId] = true;
    }
  }

  removeFromDiscoverdServices(service: { [key: string]: any }) {
    delete this.discoverdServices[service?.txtRecord?.deviceId];
  }

  cleanUp() {
    this.ad?.stop();
    if (this.browser) {
      this.browser.stop();
    }
    this.discoverdServices = {};
  }
}

export default MdnsManager;
