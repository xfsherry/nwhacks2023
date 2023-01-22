import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';
import { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button } from 'react-native';
import axios from 'axios';

const PlantDetailsScreen = ({navigation, route}) => {
  const [plantData, setPlantData] = useState([]);

  // const {addPlantToMyPlants} = useContext(GlobalContext);


  const fetchPlant = async() => {
    try {
      const data = await axios.get(`http://10.19.134.173:8000/plant/238331`);
      console.log(data.data);
      setPlantData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchPlant();
  }, []);

    return (
        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
              <Image source={ plantData.imageUrl ? plantData.imageUrl : require('../assets/placeholderplant.jpg')} style={styles.image} />
              <View style={styles.wrapper}>
                <Text style={styles.bold} variant='titleLarge'>{`${plantData.commonName ?? '(Common Name Not Found)'}`}</Text>
                <Text style={styles.italic} variant="titleMedium">{`${plantData.scientificName ?? 'N/A'}`}</Text>
              </View>
              <View style={styles.detailsWrapper}>                
                <Text>{`Family: ${plantData.family ?? 'N/A'}`}</Text>
                <Text>{`Family Common Name: ${plantData.familyCommonName ?? 'N/A'}`}</Text>
                <Text>{`Growth Months: ${plantData.growthMonths ?? 'N/A'}`}</Text>
                <Text>{`Soil Humidity: ${plantData.soilHumidity ?? 'N/A'}`}</Text>
                <Text>{`Native To: ${plantData.nativeTo ? plantData.nativeTo.join(', ') : 'N/A'}`}</Text>
                <Text>{`Edible: ${plantData.edible === false ? 'False': 'True'}`}</Text>
                <Text>{`Edible Part: ${plantData.ediblePart ?? 'N/A'}`}</Text>
                <Text>{`Family: ${plantData.family ?? 'N/A'}`}</Text>

              </View>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
    );
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsWrapper: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 'bold'
  },
  image: { 
    width: "50%",
    height: 250,
    marginTop: 50,
    marginBottom: 30,
    display: 'flex',
    alignSelf: 'center',
    borderRadius: 5
  }
}

export default PlantDetailsScreen; 