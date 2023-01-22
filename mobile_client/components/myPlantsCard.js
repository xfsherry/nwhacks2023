import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import CustomProgressBar from './progressBar';
import { Image, View } from 'react-native';

const MyPlantCard = ({id, commonName, scientificName, img, moistureLevel, moisture, navigation}) => {
    console.log(commonName);
    console.log(scientificName);
    
  return (  
    <>
    <Card 
        mode={'contained'} 
        style={styles.plantCard}
        onPress={()=> navigation.navigate('PlantDetails', {id:id})}>
        <Card.Content>
            <View style={{flexDirection:"row"}}>
                <Text style={{flex:1}} variant="titleLarge">{commonName ? commonName: scientificName}</Text>
                <Text variant="titleLarge">{moistureLevel}</Text>
            </View>
        <Text style={styles.scientificName} variant="bodyMedium">{commonName? scientificName : ''}</Text>
        <CustomProgressBar moisture={parseInt(moistureLevel.replace("%", ''))}></CustomProgressBar>
        </Card.Content>
        <Card.Cover style={{marginTop:5}} source={{ uri: img }} />
    </Card>
    </>
    );
}

export default MyPlantCard;

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    plantCard: { 
        marginVertical: 10,
        marginHorizontal: 9,
        backgroundColor: "#E0E4E6"
    },
    scientificName: {
        marginBottom: 7
    }
});