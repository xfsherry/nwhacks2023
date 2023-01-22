import { Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';
import { Searchbar } from 'react-native-paper';
import { useEffect , useState } from "react";
import axios from "axios";
import PlantCard from '../components/plantCard';
import { View, Text} from 'react-native';
import { ScrollView, SafeAreaView } from 'react-native';
import { StyleSheet} from 'react-native';

const TextSearchScreen = ({navigation, route}) => {
    // const { analyzedPlantName } = route.params; 
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchData, setSearchData] = useState([]);

    const onChangeSearch = query => setSearchQuery(query);
  

    const fetchSearch = async () => {
      try {

         const { data } = await axios.get(`http://10.19.132.114:8000/plant/search/${searchQuery}`);
             if (data) {
             setSearchData(data.data);
          //    setNumOfPages(data.total_pages);
              console.log(data.data[0]);
             }
     } catch (error) {
         console.error(error);
     }
    };

    useEffect(() => {
        const { analyzedPlantName } = route.params; 
        if (analyzedPlantName) {
            setSearchQuery(analyzedPlantName)
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // window.scroll(0,0);
        fetchSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView>
        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
            <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery}/>
                <View>
                    {searchData && 
                            searchData.map((value) => (
                                < PlantCard
                                    id={value.id}
                                    key={value.id}
                                    commonName={value.common_name}
                                    scientificName={value.scientific_name}
                                    img={value.image_url ? value.image_url : 'https://media.istockphoto.com/id/1354776450/vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-for-web-site-or.jpg?s=612x612&w=0&k=20&c=sE9bs1rjaBAZ5hO9WZ1JH_ItWjZaMih2zE9ig0GraWY='}
                                    navigation={navigation}
                                />
                            ))}
                    {searchData &&
                            searchData.length === 0 &&
                             <Text style={styles.text}> No plants found </Text>}
                </View>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
        </ScrollView>
    </SafeAreaView>
    );
};

export default TextSearchScreen; 

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
  
