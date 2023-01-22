import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import FabGroup from './components/fabGroup';
import Header from './components/Header';

export default function App() {
  const [plantData, setPlantData] = useState([]);
  const [fontsLoaded] = useFonts({
    "Open-Sans": require('./assets/OpenSans-VariableFont.ttf')
  });

  const fetchPlant = async() => {
    try {
      const data = await axios.get(`http://10.19.132.114:8000/plant/238331`);
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
      <Header></Header>
    <FabGroup></FabGroup>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%', 
    cursor: 'pointer', 
    position: 'relative', 
    textTransform: 'uppercase',
    backgroundColor: '#83AEA0'
  }

});
