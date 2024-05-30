import {
  SERVER_LOGS_COLOR,
  EXPRESS_PORT,
  YELLOW_SERVER_LOGS_COLOR,
  DESKTOP_APP_SERVICE_NAME,
} from '../electron/constants';

import * as mdns from 'mdns';

class MdnsManager {
  tcp: any;
  ad: any;
  discoverdServices: {
    [key: string]: boolean;
  };
  servicesDiscoveryLookUp: {
    [key: string]: string;
  };
  browser: mdns.Browser | null;
  isConnectedToNetwork: boolean;

  constructor() {
    console.log(SERVER_LOGS_COLOR, 'init mdns manager');

    this.tcp = mdns.tcp('http');

    try {
      this.ad = mdns.createAdvertisement(mdns.tcp('http'), EXPRESS_PORT, {
        name: DESKTOP_APP_SERVICE_NAME,
      });
    } catch (error) {
      console.log(SERVER_LOGS_COLOR, error);
    }

    this.discoverdServices = {};
    this.servicesDiscoveryLookUp = {};
    this.browser = null;
    this.isConnectedToNetwork = false;
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
        if (service.name === DESKTOP_APP_SERVICE_NAME) {
          this.toggleAppNetConnectionStatus();
        } else {
          this.addToDiscoverdServices(service);
        }
      });

      this.browser.on('serviceDown', (service) => {
        console.log(SERVER_LOGS_COLOR, 'service down: ', service.name);
        if (service.name === DESKTOP_APP_SERVICE_NAME) {
          this.toggleAppNetConnectionStatus();
        } else {
          this.removeFromDiscoverdServices(service.name as string);
        }
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

  checkNetworkConnection() {
    return this.isConnectedToNetwork;
  }

  addToDiscoverdServices(service: { [key: string]: any }) {
    const serviceDeviceId = service?.txtRecord?.deviceId;
    if (serviceDeviceId) {
      this.discoverdServices[serviceDeviceId] = true;
      this.addToServicesDiscoveryLookUp(service.name, serviceDeviceId);
    }
  }

  removeFromDiscoverdServices(serviceName: string) {
    const serviceDeviceId = this.servicesDiscoveryLookUp[serviceName];
    delete this.discoverdServices[serviceDeviceId];
    this.removeFromServicesDiscoveryLookUp(serviceName);
  }

  addToServicesDiscoveryLookUp(serviceName: string, serviceDeviceId: string) {
    this.servicesDiscoveryLookUp[serviceName] = serviceDeviceId;
  }

  removeFromServicesDiscoveryLookUp(serviceName: string) {
    delete this.servicesDiscoveryLookUp[serviceName];
  }
  toggleAppNetConnectionStatus() {
    this.isConnectedToNetwork = !this.isConnectedToNetwork;
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
