import { StyleSheet} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ImageSearchScreen from './screens/ImageSearchScreen';
import TextSearchScreen from './screens/TextSearchScreen';
import PlantDetailsScreen from './screens/PlantDetailsScreen';
import { ScrollView, SafeAreaView } from 'react-native';
import { IP_ADDRESS } from "@env"

export default function App() {
  const [plantData, setPlantData] = useState([]);
  console.log('the next thing should say hellothere')
  console.log(process.env.IP_ADDRESS);
  const fetchPlant = async() => {
    try {
      const data = await axios.get(`http://${IP_ADDRESS}:8000/plant/238331`);
      console.log(data.data);
      setPlantData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchPlant();
  }, []);

  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ImageSearch" component={ImageSearchScreen} />
        <Stack.Screen name="TextSearch" component={TextSearchScreen} />
        <Stack.Screen name="PlantDetails" component={PlantDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
