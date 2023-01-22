import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';

const ImageSearchScreen = ({navigation, route}) => {
    console.log(navigation.getState().routes[0].name);

    return (
        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
    );
};

export default ImageSearchScreen; 