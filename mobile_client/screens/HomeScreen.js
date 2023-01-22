import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';

const HomeScreen = ({navigation}) => {

    return (
        <PaperProvider>
            <Header navigation={navigation}></Header>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
    );
};

export default HomeScreen; 