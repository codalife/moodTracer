import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SQLite } from 'expo';
import { createStackNavigator } from 'react-navigation';
import Slider from 'react-native-slider';
import Smiley from './Components/Smiley';
// import Dashboard from './Components/Dashboard';

const db = SQLite.openDatabase('tracer.db');

export default class App extends React.Component {
  constructor() {
    super();
    this.changeMood = this.changeMood.bind(this);
    this.submitMood = this.submitMood.bind(this);
  }
  state = { value: 0, moods: [100, 100] };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists moods (id integer primary key not null, timestamp int, value int);',
        // `delete from moods`,
      );
    });
  }

  changeMood(value) {
    this.setState({ value });
  }

  submitMood() {
    const value = this.state.value;
    const self = this;
    db.transaction(tx => {
      const now = Date.now();
      tx.executeSql(
        `insert into moods (timestamp, value) values (?, ?);`,
        [now, value],
        (error, success) => {
          // if (error) {
          //   console.log(error);
          //   return;
          // }
          tx.executeSql(
            `select * from moods`,
            [],
            (err, { rows: { _array } }) => {
              console.log(_array);
              self.setState({
                moods: _array,
              });
            },
          );
        },
      );
    });
  }

  render() {
    const moods = this.state.moods.map((mood, i) => (
      <Text key={i}> {mood.value}</Text>
    ));
    return (
      <View style={styles.container}>
        <Smiley style={{ flex: 5 }} value={this.state.value} />
        <Button onPress={this.submitMood} title="submitMood" />
        {moods}
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
