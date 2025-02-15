import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TimerProvider} from './src/contexts/TimerContext';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/History';
import AddTimerScreen from './src/screens/AddTimer';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <TimerProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'Timer App'}}
            />
            <Stack.Screen
              name="History"
              component={HistoryScreen}
              options={{title: 'Timer History'}}
            />
            <Stack.Screen
              name="AddTimer"
              component={AddTimerScreen}
              options={{title: 'Add New Timer'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TimerProvider>
    </SafeAreaProvider>
  );
};

export default App;
