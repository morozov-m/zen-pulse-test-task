import { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SubscriptionContext } from '../App';

type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
};

type PaywallNav = NativeStackNavigationProp<RootStackParamList, 'Paywall'>;

const benefits = [
  'Безлимитный доступ ко всем медитациям',
  'AI-настрой дня под твой текущий вайб',
  'Эксклюзивные сессии для сна и фокуса',
];

export default function Paywall() {
  const navigation = useNavigation<PaywallNav>();
  const subscription = useContext(SubscriptionContext);

  const handleStartTrial = () => {
    subscription?.setSubscribed(true);
    navigation.navigate('Meditations');
  };

  return (
    <SafeAreaView className="flex-1 bg-soft-dark px-6 pt-10 pb-6">
      <View className="flex-1">
        <View className="items-center mb-8">
          <View className="h-32 w-32 rounded-full bg-purple-500/30 items-center justify-center mb-4">
            <View className="h-24 w-24 rounded-full bg-purple-400/70 items-center justify-center">
              <Text className="text-4xl">🧘‍♀️</Text>
            </View>
          </View>
          <Text className="text-white text-3xl font-bold text-center">
            ZenPulse Premium
          </Text>
          <Text className="text-gray-300 text-base text-center mt-2">
            Глубокие медитации, мягкий сон и AI-настрой на лучший день.
          </Text>
        </View>

        <View className="bg-dark/80 rounded-3xl p-5 mb-6">
          {benefits.map((item) => (
            <View key={item} className="flex-row items-start mb-3">
              <Text className="text-lg mr-2">✨</Text>
              <Text className="text-gray-100 text-base flex-1">{item}</Text>
            </View>
          ))}
        </View>

        <View className="mb-6">
          <Text className="text-gray-200 text-sm mb-3">Выбери тариф</Text>
          <View className="flex-row gap-3">
            <View className="flex-1 bg-dark rounded-2xl p-4 border border-purple-400/60">
              <Text className="text-gray-300 text-xs mb-1 uppercase">Самый выгодный</Text>
              <Text className="text-white text-lg font-semibold">Годовой</Text>
              <Text className="text-gray-400 text-sm mt-1">3,99 $ / мес</Text>
              <Text className="text-emerald-400 text-xs mt-2">Экономия 40%</Text>
            </View>
            <View className="flex-1 bg-dark/80 rounded-2xl p-4 border border-gray-700">
              <Text className="text-gray-300 text-xs mb-1 uppercase">Гибко</Text>
              <Text className="text-white text-lg font-semibold">Месяц</Text>
              <Text className="text-gray-400 text-sm mt-1">7,99 $ / мес</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text className="text-gray-500 text-xs text-center mb-2">
          7 дней бесплатно, затем автоматически спишется стоимость подписки. Можно отменить в любой момент.
        </Text>
        <Text
          className="bg-purple-500 active:bg-purple-600 rounded-full py-3 text-center text-white text-base font-semibold mb-3"
          onPress={handleStartTrial}
        >
          Попробовать бесплатно
        </Text>
        <Text
          className="text-gray-400 text-xs text-center underline"
          onPress={() => navigation.navigate('Meditations')}
        >
          Продолжить без подписки
        </Text>
      </View>
    </SafeAreaView>
  );
}

