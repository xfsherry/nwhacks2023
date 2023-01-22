import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

const Header = ({navigation, route}) => {
    const [fontsLoaded] = useFonts({
        "Open-Sans": require('../assets/OpenSans-VariableFont.ttf')
    });

    const backButton = (navigation, route) => {
        console.log(route.name);
        return route.name != "Home"? <Appbar.BackAction onPress={() => navigation.navigate('Home')} /> : <></>
      }

      return(
        <Appbar.Header style={styles.header}>
          {backButton(navigation, route)}
          <Appbar.Content  titleStyle= {{ fontFamily: 'Open-Sans', fontSize: 28 }} style={{alignItems: 'center'}} title="I wet my plants" />
          <Appbar.Action icon="sprout"/>
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
      textTransform: 'uppercase',
      backgroundColor: '#83AEA0',
    }
});

export default Header;