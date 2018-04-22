import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from 'react-native-slider';
import Smiley from './Components/Smiley';

export default class App extends React.Component {
  state = {
    value: 0,
  };
  changeValue(value) {
    this.setState({
      value,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.value}</Text>
        <Slider
          style={styles.slider}
          maximumValue={100}
          minimumValue={-100}
          step={5}
          value={0}
          onValueChange={value => this.changeValue(value)}
        />;
        <Smiley value={this.state.value} />
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
  slider: {
    width: 200,
    height: 10,
  },
});
