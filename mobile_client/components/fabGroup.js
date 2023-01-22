import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';

const FabGroup = ({navigation}) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'plus'}
          actions={[
            {
              icon: 'magnify',
              label: 'Text Search',
              onPress: () => navigation.navigate('TextSearch'),
            },
            {
              icon: 'camera',
              label: 'Image Search',
              onPress: () => navigation.navigate('ImageSearch'),
            },
            {
              icon: 'camera',
              label: 'PLANT DETAILS REMOVE ME',
              onPress: () => navigation.navigate('PlantDetails'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default FabGroup;