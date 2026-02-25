import { useContext, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MeditationCard from '../components/MeditationCard';
import MoodPicker from '../components/MoodPicker';
import { SubscriptionContext } from '../App';
import { generateAffirmation } from '../utils/aiMock';

type RootStackParamList = {
  Paywall: undefined;
  Meditations: undefined;
};

type MeditationsNav = NativeStackNavigationProp<RootStackParamList, 'Meditations'>;

const morningImage = require('../assets/morning.png');
const workImage = require('../assets/work.png');
const nightImage = require('../assets/night.png');

const SESSIONS = [
  {
    id: '1',
    title: 'Утренний мягкий старт',
    duration: '8 минут · дыхание и настрой',
    locked: false,
    image: morningImage,
  },
  {
    id: '2',
    title: 'Глубокий фокус для работы',
    duration: '12 минут · концентрация',
    locked: true,
    image: workImage,
  },
  {
    id: '3',
    title: 'Отпустить тревогу перед сном',
    duration: '15 минут · релиз напряжения',
    locked: true,
    image: nightImage,
  },
];

export default function Meditations() {
  const subscription = useContext(SubscriptionContext);
  const navigation = useNavigation<MeditationsNav>();
  const [mood, setMood] = useState<'calm' | 'neutral' | 'stressed' | null>(null);
  const [affirmation, setAffirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSubscribed = !!subscription?.isSubscribed;

  const handleCardPress = (locked: boolean) => {
    if (locked && !isSubscribed) {
      navigation.navigate('Paywall');
    } else {
      // Здесь мог бы быть плеер медитации
    }
  };

  const handleGenerate = async () => {
    if (!mood) return;
    setLoading(true);
    try {
      const text = await generateAffirmation(mood);
      setAffirmation(text);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-off-white dark:bg-soft-dark">
      <View className="px-5 pt-6 pb-10">
        <View className="mb-1">
          <Text className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            Сегодня
          </Text>
        </View>
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-2xl font-bold text-dark dark:text-white">
            Твои медитации
          </Text>
          {!isSubscribed && (
            <Text
              className="text-xs text-white bg-purple-600 dark:bg-purple-500 px-3 py-1 rounded-full font-semibold"
              onPress={() => navigation.navigate('Paywall')}
            >
              Оформить Premium
            </Text>
          )}
        </View>

        <View className="mb-8">
          <MoodPicker mood={mood} onChangeMood={setMood} onGenerate={handleGenerate} loading={loading} />
          {affirmation && (
            <View className="mt-4 bg-white/90 dark:bg-soft-dark rounded-2xl p-4 border border-purple-200/60 dark:border-purple-500/40">
              <Text className="text-xs text-purple-500 dark:text-purple-300 mb-1">
                AI-настрой дня
              </Text>
              <Text className="text-sm text-dark dark:text-gray-100 leading-5">
                {affirmation}
              </Text>
            </View>
          )}
        </View>

        <View className="mb-3 flex-row items-center justify-between">
          <Text className="text-base font-semibold text-dark dark:text-white">
            Сессии
          </Text>
        </View>

        {SESSIONS.map((session) => (
          <MeditationCard
            key={session.id}
            title={session.title}
            duration={session.duration}
            locked={session.locked && !isSubscribed}
            image={session.image}
            onPress={() => handleCardPress(session.locked)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
