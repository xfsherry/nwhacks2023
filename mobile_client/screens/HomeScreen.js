import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';

const HomeScreen = ({navigation, route}) => {

    return (
        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
    );
};

export default HomeScreen; 