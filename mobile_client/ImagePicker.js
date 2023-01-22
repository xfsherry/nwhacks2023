import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Button, Text, FAB } from 'react-native-paper';
import * as ExpoImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePicker({navigation}) {
  const [image, setImage] = useState(null);
  const [plantName, setPlantName] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
      base64: true
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchCameraAsync({
      base64: true
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result);
    }
  };

  const sendImage = async (_event) => {
    const plantName = await axios.post("http://10.19.132.114:8000/sendimage", {base64EncodedImage: image.base64}).then((res) => res.data);
    console.log(plantName);
    setPlantName(plantName);
    navigation.navigate('TextSearch', {analyzedPlantName: plantName});


  }

  const styles = {
    image: {
      width: 200,
      height: 200,
      borderRadius: 5
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    fabButtonCamera: {
      backgroundColor: '#83AEA0',
      marginRight: '25%'
    },
    fabButtonGallery: {
      backgroundColor: '#83AEA0'
    },
    buttonWrapper: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 30
    },
    analyzeButton: {
      backgroundColor: '#83AEA0',
      borderRadius: 10,
      marginTop: 60
    }
  };

  return (
    <View style={styles.container}>
      {image ? <Image source={{ uri: image.uri }} style={styles.image} /> : <View style={styles.image}/>}
      <Text>{plantName}</Text>
      <View style={styles.buttonWrapper}>
        <FAB
          icon="camera"
          style={styles.fabButtonCamera}
          onPress={takeImage}
        />
        <FAB
          icon="image-multiple"
          style={styles.fabButtonGallery}
          onPress={pickImage}
        />
      </View>
      {image && <Button textColor='#1B1B20' mode='contained' style={styles.analyzeButton} children="Analyze Photo" onPress={image ? (event) => sendImage(event) : (_event) => {}} />}
    </View>
  );
}
