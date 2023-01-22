import { Provider as PaperProvider } from 'react-native-paper';
import Header from '../components/Header';
import FabGroup from '../components/fabGroup';
import MyPlantsTitle from '../components/myPlantsTitle';
import CustomProgressBar from '../components/progressBar';

const HomeScreen = ({navigation, route}) => {

    return (

        <PaperProvider>
            <Header navigation={navigation} route={route}></Header>
            <MyPlantsTitle> My Plants</MyPlantsTitle>
            <CustomProgressBar></CustomProgressBar>
            <FabGroup navigation={navigation}></FabGroup>
        </PaperProvider>
    );
};

export default HomeScreen; 