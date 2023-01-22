import { Portal, Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';
import MyPlantsTitle from '../components/myPlantsTitle';
import CustomProgressBar from '../components/progressBar';
import { useEffect , useState } from "react";
import axios from "axios";
import MyPlantCard from '../components/myPlantsCard';
import { ScrollView, SafeAreaView } from 'react-native';
import { StyleSheet} from 'react-native';

const HomeScreen = ({navigation, route}) => {

    const [myPlantData, setMyPlantData] = useState([]);
    const [moistureLevel, setMoistureLevel] = useState('5%');

    const getMyPlants = async() => {
        try {
            const data = await axios.get(`http://10.19.130.59:8000/myplants`);
            console.log(data.data);
            setMyPlantData(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getMoistureLevel = async () => {
        try {
            const data = await axios.get(`http://10.19.130.59:8000/moisturelevel`);
            console.log(data.data);
            setMoistureLevel(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyPlants();
    }, []);

    return (
        <PaperProvider>
            <SafeAreaView style={styles.container}>
            <ScrollView>
            <Header navigation={navigation} route={route}></Header>
            <MyPlantsTitle> My Plants</MyPlantsTitle>
            {myPlantData && moistureLevel && 
                myPlantData.map((value) => (
                    < MyPlantCard
                        id={value.id}
                        key={value.id}
                        commonName={value.common_name}
                        scientificName={value.scientific_name}
                        moistureLevel={moistureLevel}
                        moisture={value.moisture_level}
                        img={value.image_url ? value.image_url : 'https://media.istockphoto.com/id/1354776450/vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-for-web-site-or.jpg?s=612x612&w=0&k=20&c=sE9bs1rjaBAZ5hO9WZ1JH_ItWjZaMih2zE9ig0GraWY='}
                        navigation={navigation}
                    />
                ))}
                
                <Portal>
                <FabGroup navigation={navigation}></FabGroup>
                </Portal>
            </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    );
};

export default HomeScreen; 

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    text: { 
      fontFamily: 'Open-Sans', 
      fontSize: 28,
      textAlign: 'center',
      marginTop: 18
    }
});
  