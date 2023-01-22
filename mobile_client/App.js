import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

export default function App() {
  const [plantData, setPlantData] = useState([]);

  const fetchPlant = async() => {
    try {
      const data: AxiosResponse = await axios.get(`http://10.19.130.59:8000/plant/238331`);
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
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! {plantData.scientificName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
