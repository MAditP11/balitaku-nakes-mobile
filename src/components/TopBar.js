import { Dimensions, StyleSheet, View } from 'react-native';
import { Colors } from '../constants';
const width = Dimensions.get('window').width;
import { LinearGradient } from 'expo-linear-gradient';
// const height = Dimensions.get('window').height;

const TopBar = ({ height, content }) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LinearGradient
        colors={['#473E97', '#726BAC']}
        style={{
          height: height,
          width: width,
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 30,
          backgroundColor: Colors.SECONDARY_BLUE,
        }}
      >
        {content}
      </LinearGradient>
    </View>
  );
};

export default TopBar;
