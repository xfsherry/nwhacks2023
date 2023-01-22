import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Text } from 'react-native';
import * as ExpoImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePicker() {
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
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Take a photo" onPress={takeImage} />
      {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
      <Button title="Process Photo" onPress={image ? (event) => sendImage(event) : (event) => {}} />
      <Text>{plantName}</Text>
    </View>
  );
}
