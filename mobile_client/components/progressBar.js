import * as React from 'react';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const CustomProgressBar = ({moisture}) => (
  <ProgressBar animatedValue={moisture/10} color={"#008AD8"} />
);

export default CustomProgressBar;