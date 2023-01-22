import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Header = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        "Open-Sans": require('../assets/OpenSans-VariableFont.ttf')
    });

    return(
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.navigate('Home')} />
        <Appbar.Content  titleStyle= {{ fontFamily: 'Open-Sans', fontSize: 28 }} title="I wet my plants" />
      </Appbar.Header>
    )
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

export default Header;