# nwHacks 2023 Project: I Wet My Plants
A mobile app that allows a user to check the moisture level of the soil against recommended levels. Plants can be added by searching manually or by using the camera or an existing image to analyze the photo using the [Plant.id machine learning API](https://web.plant.id/) to fill in the search query, which returns data from the [Trefle API](https://trefle.io/). Details such as edibility, edible parts, native countries, and ideal soil moisture levels are shown in each plant's details page. The home screen displays the moisture percentage of each plant as read from the moisture sensor.

NOTE: The moisture percentage from only one sensor is currently being displayed for all plants on the home screen due to the limited amount of sensors we had at the hackathon.

# Setup

1. Configure the .env files and run `npm install` in the `mobile_client` and `plant` folders.
2. Set up and run your arduino with the code provided in the `plant_sensor` folder, making sure that you change the `AirValue` and `WaterValue` variables. You can use the instructions [here](https://how2electronics.com/interface-capacitive-soil-moisture-sensor-arduino/) to set up the sensor. (If you do not have an arduino you can skip this step). 
3. Uncomment the code in `main.ts` in the backend to enable reading of the sensor data. (If you do not have an arduino you can skip this step)
4. Run the backend: `npm run start`
5. Run the frontend: `npx expo start --tunnel`

# Example Photos
The Home Screen
<p align="middle">
<img src="https://user-images.githubusercontent.com/50393413/215609465-c0fc8295-7a61-4c4f-8fef-dc5a2f49869c.jpg" width="300px" height="100%">
</p>
The plant image analysis screen
<p align="middle">
<img src="https://user-images.githubusercontent.com/50393413/215609567-e2ed3f08-34d6-46b1-8028-f4cda0b2d744.jpg" width="300px" height="100%">
</p>
The plant search screen with the search bar filled in with the result of the image analysis
<p align="middle">
<img src="https://user-images.githubusercontent.com/50393413/215609592-51f005a5-5e18-4dcc-a248-f4a099b8eef2.jpg" width="300px" height="100%">
</p>
The plant details screen
<p align="middle">
<img src="https://user-images.githubusercontent.com/50393413/215609620-cd5b68cf-4388-420c-b67b-a20f7b786bee.jpg" width="300px" height="100%">
</p>
The home screen after adding the plant
<p align="middle">
<img src="https://user-images.githubusercontent.com/50393413/215609366-95b2517d-edc8-49f0-9413-b12e14ccd004.jpg" width="300px" height="100%">
</p>

