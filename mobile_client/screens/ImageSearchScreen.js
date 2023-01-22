import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import ImagePicker from '../ImagePicker';

const ImageSearchScreen = ({navigation, route}) => {
    console.log(navigation.getState().routes[0].name);

    return (
        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
            <ImagePicker />
        </PaperProvider>
    );
};

export default ImageSearchScreen; 