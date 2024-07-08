import MDNS from '../../server/MdnsManager';
import server from '../../server/express'
import {
  SERVER_LOGS_COLOR,
  EXPRESS_PORT,
} from '../constants';

class ServerStarterService {
  discoverer: null| MDNS;
  port: number;
  constructor(port = EXPRESS_PORT) {

    this.discoverer = new MDNS();
    this.port = port;
  }
  startNSD() {
    this.startExpress();
    this.startServiceDiscovery();
  }

  startServiceDiscovery() {
    this.discoverer?.start();
  }

  startExpress() {
    server.listen(this.port, () => {
      console.log(
        SERVER_LOGS_COLOR,
        `Electron express server is listening on port ${this.port}`
      );
    });
  }
}

export default new ServerStarterService();
