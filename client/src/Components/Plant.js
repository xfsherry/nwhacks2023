import { useState } from "react";
import axios from "axios";

const Plant = () => {

    const [plantData, setPlantData] = useState([]);

    const fetchPlant = async() => {
        const { data } = await axios.get(`http://localhost:8000/plant/238331`);
        console.log(data);
    }
}