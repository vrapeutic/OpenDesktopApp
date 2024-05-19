import { SERVER_LOGS_COLOR, EXPRESS_PORT } from '../electron/constants';

import * as mdns from 'mdns';

class MdnsManager {
  tcp: any;
  ad: any;
  discoverdServices: {
    [key: string]: boolean;
  };
  constructor() {
    console.log(SERVER_LOGS_COLOR, 'init mdns manager');
    
    this.tcp = mdns.tcp('http');
    this.ad = mdns.createAdvertisement(mdns.tcp('http'), EXPRESS_PORT, {
      name: 'electron-service',
    });
    this.discoverdServices = {};
  }

  start() {
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

    const browser = mdns.createBrowser(this.tcp, {
      resolverSequence: sequence,
    });

    browser.on('serviceUp', (service) => {
      console.log(SERVER_LOGS_COLOR, 'service up: ', service.name);
      
      if(service?.txtRecord?.device_id){
      this.discoverdServices[service?.txtRecord?.device_id] = true;
      }
    });

    browser.on('serviceDown', (service) => {
      console.log(SERVER_LOGS_COLOR, 'service down: ', service.name);
      
      delete this.discoverdServices[service?.txtRecord?.device_id];
    });

    browser.start();
  }

  findAllServices() {
    return mdns.browseThemAll({});
  }

  checkServiceExistence(deviceId: string) {
    return this.discoverdServices[deviceId];
  }
}

export default MdnsManager;
