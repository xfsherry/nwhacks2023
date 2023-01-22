import express from 'express';
import dotenv from 'dotenv';
import {SerialPort} from 'serialport';
import {ReadlineParser} from '@serialport/parser-readline';
import axios, { AxiosResponse } from 'axios';

import cors from 'cors';

let moisturelevel: string;
const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 })
const parser = serialport.pipe(new ReadlineParser({ delimiter: '\n' }));
serialport.on("open", () => {
  console.log('serial port open');
});
parser.on('data', (data: string) =>{
  //console.log('arduino data:', data);
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
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/moisturelevel', (_req, res) => {
  res.send(moisturelevel);
});

app.post('/sendimage', express.json(),(req, res) => {
  const postBody = {
    images: [req.body.base64EncodedImage]
  };
  const postOptions = {
    headers: {
      "Api-Key": process.env.PLANT_ID_API_KEY
    },
  };
  axios.post(
    'https://api.plant.id/v2/identify',
    postBody,
    postOptions
    )
  .then(response => {
    console.log(response.data.suggestions);
    if (response.data.suggestions[0]) {
      res.send(response.data.suggestions[0].plant_name);
    } else {
      res.send("no suggestion found");
    }
  })
  .catch(error => {
    console.log(error);
  });
});

app.get('/plant/:id', async (req, res) => {
  try {
  const result: AxiosResponse = await axios.get(`http://trefle.io/api/v1/plants/${req.params.id}?token=${process.env.TREFLE_API_TOKEN}`);
  const data = {
    id: result.data.data.id,
    commonName: result.data.data.common_name,
    scientificName: result.data.data.scientific_name,
    imageUrl: result.data.data.image_url,
    light: result.data.data.main_species.growth.light,
    growthMonths: result.data.data.main_species.growth.growth_months,
    soilHumidity: result.data.data.main_species.growth.soil_humidity
  };
  res.send(data);
  } catch (e) {
    console.log(e);
  }
});

app.get('/plant/search/:searchTerm', async (req, res) => {
  try {
    const result: AxiosResponse = await axios.get(`http://trefle.io/api/v1/plants/search?q=${req.params.searchTerm}&&token=${process.env.TREFLE_API_TOKEN}`);
    res.send(result.data);
  } catch (e) {
    console.log(e);
  }
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
