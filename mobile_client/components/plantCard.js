import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const PlantCard = ({commonName, scientificName, img, navigation}) => {
    console.log(commonName);
    console.log(scientificName);
    

  return (  
    <Card 
        mode={'contained'} 
        style={styles.plantCard}
        onPress={()=> navigation.navigate('PlantDetails')}>
        <Card.Content>
        <Text variant="titleLarge">{commonName ? commonName: scientificName}</Text>
        <Text style={styles.scientificName} variant="bodyMedium">{commonName? scientificName : ''}</Text>
        </Card.Content>
        <Card.Cover source={{ uri: img }} />
    </Card>
    );
}

export default PlantCard;

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