import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('tracer.db');

export default class Dashboard extends React.Component {
  state = {
    moods: [],
  };

  componentDidMount() {
    const self = this;
    db.transaction(tx => {
      tx.executeSql(`select * from moods`, [], (err, { rows: { _array } }) => {
        self.setState({
          moods: _array,
        });
      });
    });
  }

  populateFromDB() {
    db.transaction(tx => {
      tx.executeSql(`select * from moods;`, [], (_, { rows: { _array } }) =>
        this.setState({ moods: _array }),
      );
    });
  }

  render() {
    const moods = this.state.moods.map((mood, index) => (
      <Text key={index}> {mood.value} </Text>
    ));
    return <View style={styles.container}>{moods}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
