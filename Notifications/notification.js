import { Notifications, Permissions } from 'expo';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    return;
  }
}

const localnotification = {
  title: 'How do you feel?',
  body: 'Are you 100?',
  data: { thisIsYourData: 'hello world' },
  android: { sound: true },
  ios: { sound: true },
};

function sendNotification() {
  let sendAfterFiveSeconds = Date.now();

  sendAfterFiveSeconds += 5000;

  const schedulingOptions = { time: sendAfterFiveSeconds };

  Notifications.scheduleLocalNotificationAsync(
    localnotification,
    schedulingOptions,
  );
}

export default sendNotification;
