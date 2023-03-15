
import React from 'react';
import { StyleSheet, View } from 'react-native';

import WelecomeView from './WelecomeView';
import { appId, baseUrl } from '../atlesConfig.json';
import { AppProvider, UserProvider } from '@realm/react';
import { realmContext } from './RealmContext';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemList from './ItemList';
import { LogoutButton } from './LogoutButton';

const { RealmProvider } = realmContext;
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AppProvider id={appId} baseUrl={baseUrl}>
      <UserProvider fallback={WelecomeView}>
        <App1 />
      </UserProvider>
    </AppProvider>
  );
};

const headerLeft = () => {
  return <LogoutButton />;
};

const App1 = () => {
  return (
    <>
      <RealmProvider
        sync={
          {
            flexible: true,
            onError: (_, error) => {
              // Show sync errors in the console
              console.error("RealmProvider myapp=",error);
            },
          }
        }
      >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Todo List'
            component={ItemList}
            options={{
              headerTitleAlign: 'center',
              headerLeft,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      </RealmProvider>
    </>
  )
}

const styles = StyleSheet.create({
  footerText: {
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    padding: 24,
  },
  activityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});


export default App;

