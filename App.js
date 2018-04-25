import React from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import { SQLite } from 'expo';
import { StackNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import Slider from 'react-native-slider';
import Smiley from './Components/Smiley';
import Dashboard from './Components/MoodList';
import setNotification from './Notifications/setNotification';

const db = SQLite.openDatabase('tracer.db');

class App extends React.Component {
  constructor() {
    super();
    this.changeMood = this.changeMood.bind(this);
    this.submitMood = this.submitMood.bind(this);
    this.listenForNotifications = this.listenForNotifications.bind(this);
  }
  state = { value: 0, moods: [100, 100] };

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        // 'create table if not exists moods (id integer primary key not null, timestamp int, value int);',
        `delete from moods`,
      );
    });

    this.listenForNotifications();
  }
  listenForNotifications = () => {
    Notifications.addListener(notification => {
      if (notification.origin === 'received') {
        Alert.alert(notification.title, notification.body);
      }
    });
  };

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
          // create new notification
          setNotification();
          // route to dash
          self.props.navigation.navigate('Dash');
        },
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Smiley style={{ flex: 5 }} value={this.state.value} />
        <Button
          style={styles.button}
          onPress={this.submitMood}
          title="submitMood"
        />
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
  button: {
    backgroundColor: 'blue',
  },
});

export default StackNavigator(
  {
    Home: {
      screen: App,
    },
    Dash: {
      screen: Dashboard,
    },
  },
  {
    initialRouteName: 'Home',
  },
);
