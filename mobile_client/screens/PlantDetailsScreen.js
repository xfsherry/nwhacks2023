import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';
import { useState, useEffect, useContext } from 'react';
import { Image, Text, View, Button } from 'react-native';
import axios from 'axios';
import { ScrollView, SafeAreaView } from 'react-native';
import { IP_ADDRESS } from "@env"

const PlantDetailsScreen = ({navigation, route}) => {
  const {id} = route.params;

  const [plantData, setPlantData] = useState([]);

  const addToMyPlants = async (e) => {
    try {
      const data = await axios.post(`http://${IP_ADDRESS}:8000/addplant`, {
        id: plantData.id,
        common_name: plantData.commonName,
        scientific_name: plantData.scientificName,
        image_url: plantData.imageUrl,
        soil_humidity: plantData.soilHumidity
      });
      navigation.navigate('Home');
    } catch (error) {
        console.log(error);
    }
  }

  const fetchPlant = async() => {
    try {
      const data = await axios.get(`http://${IP_ADDRESS}:8000/plant/${id}`);
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
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
              <Image source={{ uri: plantData.imageUrl ? plantData.imageUrl : 'https://media.istockphoto.com/id/1354776450/vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-for-web-site-or.jpg?s=612x612&w=0&k=20&c=sE9bs1rjaBAZ5hO9WZ1JH_ItWjZaMih2zE9ig0GraWY='}} style={styles.image} />
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
              <Button color={'#83AEA0'} title="Add to My Plants" onPress={(e) => addToMyPlants(e)}></Button>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
        </ScrollView>
    </SafeAreaView>
    );
};

const styles = {
  container: {
    flex: 1
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  detailsWrapper: {
    marginTop: 15,
    marginRight: 10,
    marginLeft: 10,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 30
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