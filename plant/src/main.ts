import express from 'express';
import dotenv from 'dotenv';
import {SerialPort} from 'serialport';
import {ReadlineParser} from '@serialport/parser-readline';

let moisturelevel: string;
const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 })
const parser = serialport.pipe(new ReadlineParser({ delimiter: '\n' }));
serialport.on("open", () => {
  console.log('serial port open');
});
parser.on('data', (data: string) =>{
  console.log('arduino data:', data);
  if (data.includes("%")) {
    moisturelevel = data;
  }
});

/**
 * Some predefined delay values (in milliseconds).
 */
export enum Delays {
  Short = 500,
  Medium = 2000,
  Long = 5000,
}

dotenv.config();

const app = express();
const port = 8000;

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/moisturelevel', (_req, res) => {
  res.send(moisturelevel);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});



