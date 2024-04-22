import { Dimensions, View } from 'react-native';
const width = Dimensions.get('window').width;
const heights = Dimensions.get('window').height;

const Background = ({ height, content }) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          height: height,
          width: width * 1.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomStartRadius: 500,
          borderBottomEndRadius: 500,
        }}
      >
        {content}
      </View>
    </View>
  );
};

export default Background;
