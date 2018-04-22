import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SQLite } from 'expo';
import Slider from 'react-native-slider';
import Smiley from './Components/Smiley';
import Dashboard from './Components/Dashboard';

const db = SQLite.openDatabase('tracer.db');

export default class App extends React.Component {
  state = { value: 0 };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists moods (id integer primary key not null, timestamp int, value int);',
      );
    });
  }

  changeMood(value) {
    this.setState({ value });
  }

  submitMood() {
    db.transaction(tx => {
      const now = Date.now();
      tx.executeSql(
        `insert into moods (timestamp, value) values (?, ?);`,
        [now, this.value],
        (error, success) => {
          if (error) {
            console.log();
            return;
          }
          console.log(success);
        },
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Smiley style={{ flex: 5 }} value={this.state.value} />
        <Button onPress={this.submitMood} title="submitMood" />
        <Slider
          style={styles.slider}
          maximumValue={100}
          minimumValue={-100}
          step={10}
          value={0}
          onValueChange={value => this.changeMood(value)}
        />;
        <Text>{this.state.value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    width: 200,
    height: 10,
  },
});
