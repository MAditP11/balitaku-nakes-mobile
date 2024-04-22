// import React from 'react';
// import { Dimensions, ScrollView, Image, StatusBar, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native';
// import { Colors, Images, WelcomeContent } from '../../constants';
// import Navigation from '../ChatPages/Navigation';
// const { height, width } = Dimensions.get('window');

// function ChatScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent />
//       <Navigation />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.DEFAULT_WHITE,
//   },
// });

// export default ChatScreen;

// import React, { Component } from 'react';
// import { Platform, StyleSheet, Text, View, Button } from 'react-native';

// const initialState = {
//   react: false,
//   next: false,
//   vue: false,
//   angular: false,
// };
// const AksiPenanganan = () => {
//   const [state, setState] = React.useState(initialState);
//   const [pasokan, setPasokan] = React.useState('');

//   const getChange = () => {
//     let pasokann = [];
//     Object.entries(state).map(([key, value]) => {
//       if (value === true) {
//         pasokann.push(key);
//       }
//     });
//     setPasokan(pasokann.join(', '));
//     console.log(pasokan);
//   };

//   return (
//     <View style={styles.container}>
//       <View>
//         <View>
//           <View style={styles.checkboxWrapper}>
//             <Checkbox
//               value={state.react}
//               onValueChange={(value) =>
//                 setState({
//                   ...state,
//                   react: value,
//                 })
//               }
//             />
//             <Text>React js</Text>
//           </View>
//           <View style={styles.checkboxWrapper}>
//             <Checkbox
//               value={state.next}
//               onValueChange={(value) =>
//                 setState({
//                   ...state,
//                   next: value,
//                 })
//               }
//             />
//             <Text>Next js</Text>
//           </View>
//           <View style={styles.checkboxWrapper}>
//             <Checkbox
//               value={state.vue}
//               onValueChange={(value) =>
//                 setState({
//                   ...state,
//                   vue: value,
//                 })
//               }
//             />
//             <Text>Vue js</Text>
//           </View>
//           <View style={styles.checkboxWrapper}>
//             <Checkbox
//               value={state.angular}
//               onValueChange={(value) =>
//                 setState({
//                   ...state,
//                   angular: value,
//                 })
//               }
//             />
//             <Text>Angular js</Text>
//           </View>
//         </View>
//         <Button onPress={() => getChange()} title="Save" />
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   textInput: {
//     borderColor: 'gray',
//     borderWidth: 1,
//   },
//   resultContainer: {
//     flexDirection: 'row',
//     padding: 10,
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   checkboxWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 5,
//   },
// });

// export default AksiPenanganan;
