declare module '../components/MoodPicker' {
  import type { ComponentType } from 'react';

  const MoodPicker: ComponentType<any>;
  export default MoodPicker;
}

declare module '../utils/aiMock' {
  export type Mood = 'calm' | 'neutral' | 'stressed';
  export function generateAffirmation(mood: Mood): Promise<string>;
}

