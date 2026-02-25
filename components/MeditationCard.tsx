import { View, Text, Image, ImageSourcePropType, Pressable } from 'react-native';
import { LockClosedIcon } from 'react-native-heroicons/outline';

type Props = {
  image?: ImageSourcePropType;
  title: string;
  duration: string;
  locked?: boolean;
  onPress?: () => void;
};

export default function MeditationCard({ image, title, duration, locked, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-3xl overflow-hidden mb-4 border-[10px] border-purple-400/80 ${
        locked ? 'opacity-80' : ''
      }`}
    >
      {image && (
        <View className="relative aspect-square w-full">
          <Image source={image} className="w-full h-full" />
          <View className="absolute inset-0 bg-black/30" />
          {locked && (
            <View className="absolute inset-0 items-center justify-center">
              <View className="bg-black/60 rounded-full px-3 py-1 flex-row items-center">
                <LockClosedIcon size={16} color="white" />
                <Text className="text-white text-xs ml-1">Только для Premium</Text>
              </View>
            </View>
          )}
        </View>
      )}
      <View className="absolute inset-0 p-3 justify-between">
        <View className="flex-row justify-between items-start">
          <View className="flex-1 mr-2">
            <Text
              numberOfLines={2}
              className={`text-lg font-semibold ${locked ? 'text-gray-100' : 'text-white'}`}
            >
              {title}
            </Text>
          </View>
          {locked && (
            <View className="h-9 w-9 rounded-full bg-black/45 items-center justify-center">
              <LockClosedIcon size={18} color="#ffffff" />
            </View>
          )}
        </View>
        <Text className="text-sm text-gray-100/95">{duration}</Text>
      </View>
    </Pressable>
  );
}
