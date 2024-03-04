

import * as express from 'express';
import { Request, Response } from 'express';
const app = express();
import * as http from 'http';

app.get('/', (req:Request, res:Response) => {
    res.send('Hello from Express server started by Electron app!');
});
console.log("dfghjk")

const Server = http.createServer(app);
Server.listen(9000, () => {
    console.log('Express server running on port 9000');
});


export { Server }