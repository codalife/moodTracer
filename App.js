import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Svg } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg height={300} width={300}>
          <Svg.Circle
            cx={150}
            cy={150}
            r={145}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#f1c40f"
          />
          <Svg.Circle
            cx={100}
            cy={130}
            r={15}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#e74c3c"
          />
          <Svg.Circle
            cx={200}
            cy={130}
            r={15}
            strokeWidth={2.5}
            stroke="#e74c3c"
            fill="#e74c3c"
          />
          <Svg.Path
            d="M80,200 C 80 280, 220 280, 220,200"
            fill="#f1c40f"
            stroke="#e74c3c"
            strokeWidth={2.5}
          />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
