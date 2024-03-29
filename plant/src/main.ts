import express from 'express';
import dotenv from 'dotenv';
import {SerialPort} from 'serialport';
import {ReadlineParser} from '@serialport/parser-readline';
import axios, { AxiosResponse } from 'axios';
import cors from 'cors';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, child, get, remove } from "firebase/database";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL
};

initializeApp(firebaseConfig);

let moisturelevel: string;
/*

*** IF YOU HAVE AN ARDUINO CONNECTED, UNCOMMENT THE CODE BELOW ***

*/

// const serialport = new SerialPort({ path: 'COM3', baudRate: 9600 })
// const parser = serialport.pipe(new ReadlineParser({ delimiter: '\n' }));
// serialport.on("open", () => {
//   console.log('serial port open');
// });
// parser.on('data', (data: string) =>{
//   //console.log('arduino data:', data);
//   if (data.includes("%")) {
//     moisturelevel = data;
//   }
// });


const app = express();
const port = process.env.PORT;

app.use(cors({
  origin: '*'
}));

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server');
});

app.get('/myplants', (req, res) => {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `plants/`)).then((snapshot) => {
  if (snapshot.exists()) {
    const response = []
    for (const [key, value] of Object.entries(snapshot.val())) {
      response.push({id: key, ...value as any});
    }
    res.send(response);
  } else {
    console.log("No data available");
    res.send([]);
  }
  }).catch((error) => {
    console.error(error);
  });
})

app.post('/addplant', express.json(), async(req, res) => {
  const writePlantData = async (id = '', common_name ='', scientific_name='', image_url='', soil_humidity='') => {
    const db = getDatabase();
    await set(ref(db, 'plants/' + id), {
      common_name,
      scientific_name,
      image_url,
      soil_humidity
    });
  }
  const { id, common_name, scientific_name, image_url, soil_humidity } = req.body;
  await writePlantData(id, common_name, scientific_name, image_url, soil_humidity);
  res.send('success');
})

app.post('/removeplant', express.json(), async(req, res) => {
  const removePlantData = async (id) => {
    const db = getDatabase();
    await remove(ref(db, 'plants/' + id));
  }
  await removePlantData(req.body.id);
  res.send('success');
})

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
  const data = result.data.data;
  const mainSpecies = data.main_species;
  const dataResponse = {
    id: data.id,
    commonName: data.common_name,
    scientificName: data.scientific_name,
    imageUrl: data.image_url,
    light: mainSpecies.growth.light,
    growthMonths: mainSpecies.growth.growth_months,
    soilHumidity: Math.floor(Math.random()*11),
    family: mainSpecies.family,
    familyCommonName: mainSpecies.family_common_name,
    edible: mainSpecies.edible,
    ediblePart: mainSpecies.edible_part,
    genus: mainSpecies.genus,
    nativeTo: mainSpecies.distribution.native
  };
  res.send(dataResponse);
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
