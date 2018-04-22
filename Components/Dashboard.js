import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('tracer.db');

export default class Dashboard extends React.Component {
  state = {
    moods: [],
  };

  populateFromDB() {
    db.transaction(tx => {
      tx.executeSql(`select * from moods;`, [], (_, { rows: { _array } }) =>
        this.setState({ moods: _array }),
      );
    });
  }

  render() {
    const moods = this.state.moods.map(mood => <Text> {mood.value} </Text>);
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
