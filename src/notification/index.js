import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
import {getSyncData, storeDatasync} from '../storage/AsyncStorage';
import {postData} from '../API';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission({
    sound: true,
    alert: true,
  });
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

const getFcmToken = async () => {
  let fcmToken = await getSyncData('fcmToken');
  // console.log('the old token', fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log('the new token', fcmToken);
        await storeDatasync('fcmToken', fcmToken);
      }
    } catch (error) {
      console.log('error getting token', error);
    }
  }
};

export const notificationListener = async () => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: `default`,
    name: `Default Channel`,
    importance: AndroidImportance.HIGH,
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging().onMessage(async remoteMessage => {
    console.log('received in foreground', remoteMessage);
    try {
      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          smallIcon: 'ic_launcher',
          largeIcon:
            remoteMessage.notification.android.imageUrl || 'ic_launcher',
          style: {
            //   type: AndroidStyle.BIGPICTURE,
            //   picture: remoteMessage.notification.android.imageUrl,
            type: AndroidStyle.BIGTEXT,
            text: remoteMessage.notification.body,
          },
          pressAction: {
            id: 'default',
          },
        },
      });
    } catch (error) {
      console.log('error', error);
    }
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
};
