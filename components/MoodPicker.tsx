import { Text, View, Pressable } from 'react-native';

type Mood = 'calm' | 'neutral' | 'stressed';

type Props = {
  mood: Mood | null;
  onChangeMood: (mood: Mood) => void;
  onGenerate: () => void;
  loading: boolean;
};

const MOODS: { id: Mood; label: string; emoji: string }[] = [
  { id: 'calm', label: 'Спокойный', emoji: '😊' },
  { id: 'neutral', label: 'Норм', emoji: '😐' },
  { id: 'stressed', label: 'На взводе', emoji: '😵‍💫' },
];

export default function MoodPicker({ mood, onChangeMood, onGenerate, loading }: Props) {
  return (
    <View className="bg-white/90 dark:bg-soft-dark rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
      <Text className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">
        AI-настрой дня
      </Text>
      <Text className="text-sm text-dark dark:text-gray-100 mb-3">
        Как ты себя чувствуешь сейчас?
      </Text>

      <View className="flex-row justify-between mb-3">
        {MOODS.map((item) => {
          const selected = mood === item.id;
          return (
            <View key={item.id} className="flex-1 mx-1">
              <Pressable
                className={`rounded-2xl py-2 px-2 items-center ${
                  selected
                    ? 'bg-purple-500'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
                onPress={() => onChangeMood(item.id)}
              >
                <Text className="text-2xl mb-1">
                  {item.emoji}
                </Text>
                <Text
                  className={`text-xs ${
                    selected ? 'text-white' : 'text-dark dark:text-gray-100'
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      <Text
        className={`mt-1 text-center text-sm font-semibold rounded-full py-2 ${
          mood
            ? 'bg-purple-500 text-white'
            : 'bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
        }`}
        onPress={mood && !loading ? onGenerate : undefined}
      >
        {loading ? 'Генерация...' : 'Сгенерировать аффирмацию'}
      </Text>
    </View>
  );
}

