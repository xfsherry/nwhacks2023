import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const Header = () => {
    return(
        <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => {}} />
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