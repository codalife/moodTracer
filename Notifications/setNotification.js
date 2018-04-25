/*
    Ask to report mood every 30 minutes.
    If user misses reporting do not send more notifications
        Create a stack of missed reports
        Ask for data for missed times.
            Allow user to skip if she does not remember her mood
    Record mood for the closest passed half hour
*/

import { Notifications, Permissions } from 'expo';

const missedReports = [];

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
}

const localnotification = {
  title: 'How do you feel?',
  body: `Let's record your mood as of right now`,
  data: { thisIsYourData: 'hello world' },
  android: { sound: true },
  ios: { sound: true },
};

function setNotification() {
  let sendAfterFiveSeconds = Date.now();

  sendAfterFiveSeconds += 5000;

  const schedulingOptions = { time: sendAfterFiveSeconds };

  Notifications.scheduleLocalNotificationAsync(
    localnotification,
    schedulingOptions,
  );
}

export default setNotification;
