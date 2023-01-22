import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import ImagePicker from '../ImagePicker';

const ImageSearchScreen = ({navigation}) => {

    return (
        <PaperProvider>
            <Header navigation={navigation}></Header>
            <ImagePicker />
        </PaperProvider>
    );
};

export default ImageSearchScreen; 