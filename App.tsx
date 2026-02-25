import 'react-native-gesture-handler';
import 'react-native-reanimated';
import './global.css';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import Paywall from './screens/Paywall';
import Meditations from './screens/Meditations';
import { createContext, useMemo, useState } from 'react';

type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type SubscriptionContextValue = {
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
};

export const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

export default function App() {
  const { colorScheme } = useColorScheme();
  const [isSubscribed, setSubscribed] = useState(false);

  const subscriptionValue = useMemo(
    () => ({ isSubscribed, setSubscribed }),
    [isSubscribed],
  );

  return (
    <SubscriptionContext.Provider value={subscriptionValue}>
      <NavigationContainer>
        <SafeAreaView className="flex-1 bg-off-white dark:bg-soft-dark">
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'transparent' },
            }}
          >
            <Stack.Screen name="Paywall" component={Paywall} />
            <Stack.Screen name="Meditations" component={Meditations} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </SubscriptionContext.Provider>
  );
}