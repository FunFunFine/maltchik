import { app } from '../src/server';

const apiPort = process.env.EXPRESS_PORT || 5000;

app.listen(apiPort, '0.0.0.0');
console.log(`API listening on port: ${apiPort}`);
