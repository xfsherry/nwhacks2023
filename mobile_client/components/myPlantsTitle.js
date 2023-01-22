import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const MyPlantsTitle = () => (
  <Card.Title style={styles.header}
    title="My Plants"
    left={(props) => <Avatar.Icon backgroundColor='black' {...props} icon="flower-tulip" />}
  />
);

export default MyPlantsTitle;

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
      textAlignVertical: 'center'
    }
});
